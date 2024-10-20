import express, { Request, Response } from "express";
import db from "../../lib/db";

const router = express.Router();

// Fetch all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Add a new products
router.post("/", async (req: Request, res: Response) => {
  try {
    const { pro_name, pro_des, type_id, band_id } = req.body;

    const [result] = await db.query(
      `INSERT INTO products (pro_name, pro_des, type_id, band_id)
 VALUES (?, ?, ?, ?)`,
      [pro_name, pro_des, type_id, band_id]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting products:", error);
    res.status(500).json({ error: "Failed to add products" });
  }
});

// Update an existing products
router.put("/", async (req: Request, res: Response) => {
  try {
    const { pro_id, pro_name, pro_des, type_id, band_id } = req.body;

    const [result] = await db.query(
      `UPDATE products SET pro_id, pro_name, pro_des, type_id, band_id = ? WHERE pro_id = ?`,
      [pro_id, pro_name, pro_des, type_id, band_id]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error updating products:", error);
    res.status(500).json({ error: "Failed to update products" });
  }
});

// Delete an existing products
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { pro_id } = req.body;

    const [result] = await db.query(`DELETE FROM products WHERE pro_id = ?`, [
      pro_id,
    ]);

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(500).json({ error: "Failed to delete products" });
  }
});

export default router;
