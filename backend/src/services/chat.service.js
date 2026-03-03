import db from "../config/db.js";

export async function startConversation(itemId, buyerId) {
  const query = `
    INSERT INTO conversations (item_id, buyer_id, seller_id)
    SELECT $1, $2, seller_id
    FROM items
    WHERE id = $1
    ON CONFLICT (item_id, buyer_id, seller_id)
    DO UPDATE SET updated_at = NOW()
    RETURNING *;
  `;

  const { rows } = await db.query(query, [itemId, buyerId]);
  return rows[0];
}

export async function getChats(userId, type) {
  let whereClause = "";
  let userJoin = "";

  if (type === "buying") {
    whereClause = "c.buyer_id = $1";
    userJoin = "JOIN user_data u ON u.id = c.seller_id";
  } else {
    whereClause = "c.seller_id = $1";
    userJoin = "JOIN user_data u ON u.id = c.buyer_id";
  }

  const query = `
    SELECT
      c.id,
      u.name,
      c.updated_at,
      c.item_id,
      i.title,
      m.msg AS last_message,
      m.sender_id AS last_sender_id
    FROM conversations c
    ${userJoin}
    JOIN items i ON i.id = c.item_id
    LEFT JOIN messages m ON m.id = c.last_message_id
    WHERE ${whereClause}
    ORDER BY c.updated_at DESC;
  `;

  const { rows } = await db.query(query, [userId]);
  return rows;
}

export async function getMessages(convId, userId) {
  convId = Number(convId);
  userId = Number(userId);

  const convCheck = `
    SELECT 1
    FROM conversations
    WHERE id = $1
      AND (buyer_id = $2 OR seller_id = $2)
  `;

  const convRes = await db.query(convCheck, [convId, userId]);

  if (convRes.rowCount === 0) {
    throw new Error("FORBIDDEN");
  }

  const query = `
    SELECT id, sender_id, msg, created_at, read_at
    FROM messages
    WHERE conv_id = $1
    ORDER BY created_at ASC
  `;

  const { rows } = await db.query(query, [convId]);
  return rows;
}

export async function sendMessage(convId, userId, msg) {
  const check = `
    SELECT buyer_id, seller_id
    FROM conversations
    WHERE id = $1
      AND (buyer_id = $2 OR seller_id = $2)
  `;

  const allowed = await db.query(check, [convId, userId]);

  if (allowed.rowCount === 0) {
    throw new Error("FORBIDDEN");
  }

  const { buyer_id, seller_id } = allowed.rows[0];

  const receiverId =
    buyer_id === userId ? seller_id : buyer_id;

  const insert = `
    INSERT INTO messages (conv_id, sender_id, msg)
    VALUES ($1, $2, $3)
    RETURNING id, conv_id, sender_id, msg, created_at, read_at
  `;

  const { rows } = await db.query(insert, [convId, userId, msg]);

  await db.query(
    `
      UPDATE conversations
      SET updated_at = NOW(),
          last_message_id = $2
      WHERE id = $1
    `,
    [convId, rows[0].id]
  );

  return {
    message: rows[0],
    receiverId,
  };
}