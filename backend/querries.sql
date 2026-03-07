-- clean slate
DROP TABLE IF EXISTS messages, conversations, archive, items, user_data, users, categories CASCADE;

-- categories FIRST
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO categories (name) VALUES
  ('Electronics'),
  ('Books'),
  ('Games'),
  ('Furniture'),
  ('Toys'),
  ('Apparel'),
  ('Musical instruments'),
  ('Shoes');

-- users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  region VARCHAR(100)
);

CREATE TABLE user_data (
  id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  bio VARCHAR(150)
);

-- items
CREATE TABLE items (
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

-- archive
CREATE TABLE archive (
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

-- chat
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  item_id INT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  buyer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CHECK (buyer_id <> seller_id),
  UNIQUE (item_id, buyer_id, seller_id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conv_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  msg TEXT NOT NULL CHECK (length(msg) <= 500),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMPTZ
);

ALTER TABLE conversations
ADD COLUMN last_message_id INT REFERENCES messages(id);

ALTER TABLE conversations
ALTER COLUMN last_message_id DROP NOT NULL;

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

CREATE TRIGGER trg_update_conversation
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION update_conversation_on_message();


CREATE INDEX idx_conv_buyer ON conversations(buyer_id);
CREATE INDEX idx_conv_seller ON conversations(seller_id);
CREATE INDEX idx_msg_conv_time ON messages(conv_id, created_at DESC);