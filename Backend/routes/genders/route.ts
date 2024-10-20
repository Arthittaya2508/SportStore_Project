import express, { Request, Response } from "express";
import db from "../../lib/db"; // Assuming you're still using the same db connection

const router = express.Router();

// Fetch all genders
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM genders");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching genders:", error);
    res.status(500).json({ error: "Failed to fetch genders" });
  }
});

// Add a new gender
router.post("/", async (req: Request, res: Response) => {
  try {
    const { gender_name } = req.body;

    const [result] = await db.query(
      `INSERT INTO genders (gender_name) VALUES (?)`,
      [gender_name]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting gender:", error);
    res.status(500).json({ error: "Failed to add gender" });
  }
});

// Update an existing gender
router.put("/", async (req: Request, res: Response) => {
  try {
    const { gender_id, gender_name } = req.body;

    const [result] = await db.query(
      `UPDATE genders SET gender_name = ? WHERE gender_id = ?`,
      [gender_name, gender_id]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error updating gender:", error);
    res.status(500).json({ error: "Failed to update gender" });
  }
});

// Delete an existing gender
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { gender_id } = req.body;

    const [result] = await db.query(`DELETE FROM genders WHERE gender_id = ?`, [
      gender_id,
    ]);

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting gender:", error);
    res.status(500).json({ error: "Failed to delete gender" });
  }
});

export default router;
