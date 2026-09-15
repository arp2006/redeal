import db from "./db.js";

export const initDb = async () => {
  const client = await db.connect();
  try {
    await client.query("BEGIN;");

    // 1. Categories
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
      );
    `);

    await client.query(`
      INSERT INTO categories (name) VALUES
        ('Electronics'),
        ('Books'),
        ('Games'),
        ('Furniture'),
        ('Toys'),
        ('Apparel'),
        ('Musical instruments'),
        ('Shoes')
      ON CONFLICT (name) DO NOTHING;
    `);

    // 2. Users & User Data
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        region VARCHAR(100)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_data (
        id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(50) NOT NULL,
        bio VARCHAR(150)
      );
    `);

    // 3. Items & Archive
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        location VARCHAR(100),
        category_id INTEGER REFERENCES categories(id),
        seller_id INTEGER REFERENCES users(id),
        images TEXT[] NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS archive (
        id INT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        location VARCHAR(100),
        category_id INTEGER REFERENCES categories(id),
        seller_id INTEGER REFERENCES users(id),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        images TEXT[] NOT NULL,
        removed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Conversations & Messages
    await client.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
        buyer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        seller_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        CHECK (buyer_id <> seller_id),
        UNIQUE (item_id, buyer_id, seller_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        conv_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
        sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        msg TEXT NOT NULL CHECK (length(msg) <= 500),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        read_at TIMESTAMPTZ
      );
    `);

    // Add last_message_id column to conversations if not exists
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='conversations' AND column_name='last_message_id'
        ) THEN
          ALTER TABLE conversations ADD COLUMN last_message_id INT REFERENCES messages(id);
        END IF;
      END $$;
    `);

    // 5. Trigger Function & Trigger
    await client.query(`
      CREATE OR REPLACE FUNCTION update_conversation_on_message()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE conversations
        SET
          updated_at = CURRENT_TIMESTAMP,
          last_message_id = NEW.id
        WHERE id = NEW.conv_id;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'trg_update_conversation'
        ) THEN
          CREATE TRIGGER trg_update_conversation
          AFTER INSERT ON messages
          FOR EACH ROW
          EXECUTE FUNCTION update_conversation_on_message();
        END IF;
      END $$;
    `);

    // 6. Indexes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_conv_buyer ON conversations(buyer_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_conv_seller ON conversations(seller_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_msg_conv_time ON messages(conv_id, created_at DESC);`);

    await client.query("COMMIT;");
    console.log("Database initialized successfully.");
  } catch (error) {
    await client.query("ROLLBACK;");
    console.error("Failed to initialize database:", error);
    throw error;
  } finally {
    client.release();
  }
};
