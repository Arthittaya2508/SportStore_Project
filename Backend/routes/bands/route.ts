import express, { Request, Response } from "express";
import db from "../../lib/db";

const router = express.Router();

// Fetch all bands
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM bands");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching bands:", error);
    res.status(500).json({ error: "Failed to fetch bands" });
  }
});

// Add a new bands
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { band_name } = data;

    const [result] = await db.query(
      `INSERT INTO bands (band_name) VALUES (?)`,
      [band_name]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting band:", error);
    res.status(500).json({ error: "Failed to add band" });
  }
});

// Update an existing band
router.put("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { band_id, band_name } = data;

    const [result] = await db.query(
      `UPDATE bands SET band_name = ? WHERE band_id = ?`,
      [band_name, band_id]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error updating band:", error);
    res.status(500).json({ error: "Failed to update band" });
  }
});

// Delete an existing band
router.delete("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { band_id } = data;

    const [result] = await db.query(`DELETE FROM bands WHERE band_id = ?`, [
      band_id,
    ]);

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting band:", error);
    res.status(500).json({ error: "Failed to delete band" });
  }
});

export default router;
