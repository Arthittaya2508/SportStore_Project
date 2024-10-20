import express, { Request, Response } from "express";
import db from "../../lib/db"; // Ensure the path to your db connection is correct

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

// Add multiple products
router.post("/", async (req: Request, res: Response) => {
  try {
    const products = req.body;

    // Ensure products is an array
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ error: "Invalid input, expected an array of products" });
    }

    // Generate the SQL query with placeholders
    const sql = `
      INSERT INTO products (pro_name, pro_des, type_id, band_id)
      VALUES ${products.map(() => "(?, ?, ?, ?)").join(", ")}
    `;

    // Flatten the array of product values into a single array
    const values = products.flatMap((product) => [
      product.pro_name,
      product.pro_des,
      product.type_id,
      product.band_id,
    ]);

    await db.query(sql, values);

    res.json({ success: true });
  } catch (error) {
    console.error("Error inserting products:", error);
    res.status(500).json({ error: "Failed to add products" });
  }
});

// Update an existing product
router.put("/", async (req: Request, res: Response) => {
  try {
    const { id, pro_name, type_id, band_id } = req.body;

    await db.query(
      `UPDATE products
       SET pro_name = ?, type_id = ?, band_id = ?
       WHERE pro_id = ?`,
      [pro_name, type_id, band_id, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    await db.query(`DELETE FROM products WHERE pro_id = ?`, [id]);

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
