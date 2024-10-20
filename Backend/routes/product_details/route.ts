import express, { Request, Response } from "express";
import db from "../../lib/db";

const router = express.Router();

// Fetch all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM product_details");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Add a new products
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      pro_id,
      color_id,
      size_id,
      gender_id,
      stock_quantity,
      sku,
      pro_image,
      sale_price,
      cost_price,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO product_details (pro_id, color_id, size_id, gender_id, stock_quantity, sku, pro_image, sale_price, cost_price)
 VALUES (?, ?, ?, ?)`,
      [
        pro_id,
        color_id,
        size_id,
        gender_id,
        stock_quantity,
        sku,
        pro_image,
        sale_price,
        cost_price,
      ]
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
    const {
      pro_id,
      color_id,
      size_id,
      gender_id,
      stock_quantity,
      sku,
      pro_image,
      sale_price,
      cost_price,
    } = req.body;

    const [result] = await db.query(
      `UPDATE product_details SET pro_id, color_id, size_id, gender_id, stock_quantity, sku, pro_image, sale_price, cost_price = ? WHERE pro_id = ?`,
      [
        pro_id,
        color_id,
        size_id,
        gender_id,
        stock_quantity,
        sku,
        pro_image,
        sale_price,
        cost_price,
      ]
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

    const [result] = await db.query(
      `DELETE FROM product_details WHERE pro_id = ?`,
      [pro_id]
    );

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(500).json({ error: "Failed to delete products" });
  }
});

export default router;
