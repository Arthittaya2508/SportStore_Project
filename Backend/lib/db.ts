// db.ts
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T>(sql: string, values?: any[]): Promise<T[]> {
  const [rows] = await pool.execute(sql, values);
  return rows as T[];
}

export default pool;
