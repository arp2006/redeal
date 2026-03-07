import { Pool } from "pg";
import { ENV } from "./env.js";

const db = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: ENV.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false
});

export default db;