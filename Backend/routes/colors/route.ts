import express, { Request, Response } from "express";
import db from "../../lib/db"; // Assuming you're still using the same db connection

const router = express.Router();

// Fetch all colors
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM colors");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: "Failed to fetchcolors" });
  }
});

// Add a new color
router.post("/", async (req: Request, res: Response) => {
  try {
    const { color_name } = req.body;

    const [result] = await db.query(
      `INSERT INTO colors (color_name) VALUES (?)`,
      [color_name]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting color:", error);
    res.status(500).json({ error: "Failed to add color" });
  }
});

// Update an existing color
router.put("/", async (req: Request, res: Response) => {
  try {
    const { color_id, color_name } = req.body;

    const [result] = await db.query(
      `UPDATE colors SET color_name = ? WHERE color_id = ?`,
      [color_name, color_id]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error updating color:", error);
    res.status(500).json({ error: "Failed to update color" });
  }
});

// Delete an existing color
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { color_id } = req.body;

    const [result] = await db.query(`DELETE FROM colors WHERE color_id = ?`, [
      color_id,
    ]);

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting color:", error);
    res.status(500).json({ error: "Failed to delete color" });
  }
});

export default router;
