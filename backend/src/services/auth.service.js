import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export async function login({ email, password }) {
  if (!email || !password) {
    throw { status: 400, message: "Missing required fields" };
  }

  let result = await db.query(
    "SELECT id, password_hash FROM users WHERE email = $1;",
    [email]
  );

  if (result.rows.length === 0) {
    result = await db.query(
      "SELECT id, password_hash FROM users WHERE username = $1;",
      [email]
    );
    if (result.rows.length === 0) {
      throw { status: 404, message: "Account does not exist" };
    }
  }

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    throw { status: 401, message: "Invalid password" };
  }

  const token = jwt.sign(
    { sub: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    user: { id: user.id },
    token,
  };
}

export async function register(data) {
  const { name, username, email, password, repeatPassword, region } = data;

  if (!name || !username || !email || !password || !repeatPassword) {
    throw { status: 400, message: "Missing required fields" };
  }

  if (password !== repeatPassword) {
    throw { status: 400, message: "Passwords do not match" };
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const existing = await client.query(
      "SELECT id FROM users WHERE email = $1;",
      [email]
    );

    if (existing.rows.length > 0) {
      throw { status: 409, message: "Email already registered" };
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await client.query(
      `INSERT INTO users(username, email, password_hash, region)
       VALUES($1,$2,$3,$4) RETURNING id;`,
      [username, email, hashed, region || null]
    );

    await client.query(
      "INSERT INTO user_data (id, name) VALUES($1,$2);",
      [result.rows[0].id, name]
    );

    await client.query("COMMIT");

    const token = jwt.sign(
      { sub: result.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // try {
    //   await sendWelcomeEmail(email, name);
    // } 
    // catch (err) {
    //   throw err;
    // }

    return { user: { id: result.rows[0].id }, token };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function changePassword(userId, body) {
  const { oldPass, newPass, confPass } = body;

  if (!oldPass || !newPass || !confPass) {
    throw { status: 400, message: "Missing required fields" };
  }

  if (newPass !== confPass) {
    throw { status: 400, message: "Passwords do not match" };
  }

  if (oldPass === newPass) {
    throw { status: 400, message: "New password must differ" };
  }

  const result = await db.query(
    "SELECT password_hash FROM users WHERE id = $1;",
    [userId]
  );

  if (result.rows.length === 0) {
    throw { status: 404, message: "User not found" };
  }

  const ok = await bcrypt.compare(oldPass, result.rows[0].password_hash);
  if (!ok) {
    throw { status: 400, message: "Old password incorrect" };
  }

  const hashed = await bcrypt.hash(newPass, 10);
  await db.query(
    "UPDATE users SET password_hash = $1 WHERE id = $2;",
    [hashed, userId]
  );
}