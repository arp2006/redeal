import db from "../config/db.js";

export async function me(user) {
  if (!user) return { user: null };
  return { user: { id: user.sub } };
}

export async function info(userId) {
  const res = await db.query(
    `
    SELECT ud.name, u.email, u.username
    FROM users u
    JOIN user_data ud ON u.id = ud.id
    WHERE u.id = $1;
    `,
    [userId]
  );
  return res.rows[0];
}

export async function publicProfile(id) {
  const res = await db.query(
    `
    SELECT ud.name, u.username
    FROM users u
    JOIN user_data ud ON u.id = ud.id
    WHERE u.id = $1;
    `,
    [id]
  );
  if (!res.rows.length) throw { status: 404, message: "User not found" };
  return res.rows[0];
}

export async function userListings(id) {
  const res = await db.query(
    "SELECT * FROM items WHERE seller_id = $1;",
    [id]
  );
  return res.rows;
}

export async function details(userId) {
  const res = await db.query(
    `
    SELECT username, name, bio, email
    FROM user_data ud
    JOIN users u ON ud.id = u.id
    WHERE ud.id = $1;
    `,
    [userId]
  );
  if (!res.rows.length) throw { status: 404, message: "User not found" };
  return res.rows[0];
}

export async function changeDetails(userId, body) {
  const { name, username, bio } = body;

  const clean = (v) =>
    typeof v === "string" && v.trim() !== "" ? v.trim() : null;

  const newName = clean(name);
  const newUsername = clean(username);
  const newBio = clean(bio);

  if (!newName && !newUsername && !newBio) {
    throw { status: 400, message: "Nothing to update" };
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    if (newUsername) {
      await client.query(
        "UPDATE users SET username = $1 WHERE id = $2;",
        [newUsername, userId]
      );
    }

    if (newName || newBio) {
      await client.query(
        `
        UPDATE user_data
        SET name = COALESCE($1, name),
            bio  = COALESCE($2, bio)
        WHERE id = $3;
        `,
        [newName, newBio, userId]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
