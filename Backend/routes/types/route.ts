import express, { Request, Response } from "express";
import db from "../../lib/db"; // ปรับเส้นทางให้ตรงกับตำแหน่งของไฟล์ db.ts ที่ใช้งาน

const router = express.Router();

// Fetch all types
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM types");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({ error: "Failed to fetch types" });
  }
});

// Add a new type
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body; // ใช้ req.body แทน request.json()
    const { type_name } = data;

    const [result] = await db.query(
      `INSERT INTO types (type_name) VALUES (?)`,
      [type_name]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting type:", error);
    res.status(500).json({ error: "Failed to add type" });
  }
});

// Update an existing type
router.put("/", async (req: Request, res: Response) => {
  try {
    const data = req.body; // ใช้ req.body แทน request.json()
    const { type_id, type_name } = data;
    console.log({ type_id, type_name }); // ตรวจสอบข้อมูลที่ได้รับ

    const [result] = await db.query(
      `UPDATE types SET type_name = ? WHERE type_id = ?`,
      [type_name, type_id]
    );
    console.log(result); // ตรวจสอบผลลัพธ์

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error updating type:", error);
    res.status(500).json({ error: "Failed to update type" });
  }
});

// Delete an existing type
router.delete("/", async (req: Request, res: Response) => {
  try {
    const data = req.body; // ใช้ req.body แทน request.json()
    const { type_id } = data;
    console.log({ type_id }); // ตรวจสอบข้อมูลที่ได้รับ

    const [result] = await db.query(`DELETE FROM types WHERE type_id = ?`, [
      type_id,
    ]);
    console.log(result); // ตรวจสอบผลลัพธ์

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting type:", error);
    res.status(500).json({ error: "Failed to delete type" });
  }
});

export default router;
