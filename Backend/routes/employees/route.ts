import express, { Request, Response } from "express";
import db from "../../lib/db";

const router = express.Router();

// Fetch all employees
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// Register a new employee
router.post("/", async (req: Request, res: Response) => {
  const connection = await db.getConnection(); // Get connection for transaction

  try {
    const data = req.body; // Access the request body
    const {
      name,
      lastname,
      telephone,
      email,
      username,
      password,
      image,
      position,
    } = data;

    await connection.beginTransaction(); // Start transaction

    // Insert employee data
    const [employeeResult] = await connection.query(
      `INSERT INTO employees (name, lastname, telephone, email, username, password, image, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, lastname, telephone, email, username, password, image, position]
    );

    const emp_id = (employeeResult as any).insertId; // Type assertion for insertId

    await connection.commit(); // Commit transaction

    res.json({ success: true, emp_id });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error inserting employee:", error);
    res.status(500).json({ error: "Failed to register employee" });
  } finally {
    connection.release(); // Release connection
  }
});

// Update employee information
router.put("/", async (req: Request, res: Response) => {
  const connection = await db.getConnection(); // Get connection for transaction

  try {
    const data = req.body;
    const {
      emp_id,
      name,
      lastname,
      telephone,
      email,
      username,
      password,
      image,
      position,
    } = data;

    await connection.beginTransaction(); // Start transaction

    // Update employee data
    await connection.query(
      `UPDATE employees SET name = ?, lastname = ?, telephone = ?, email = ?, username = ?, password = ?, image = ?, position = ?
       WHERE id = ?`,
      [
        name,
        lastname,
        telephone,
        email,
        username,
        password,
        image,
        position,
        emp_id,
      ]
    );

    await connection.commit(); // Commit transaction

    res.json({ success: true });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  } finally {
    connection.release(); // Release connection
  }
});

// Delete employee
router.delete("/", async (req: Request, res: Response) => {
  const connection = await db.getConnection(); // Get connection for transaction

  try {
    const { emp_id } = req.body;

    await connection.beginTransaction(); // Start transaction

    // Delete employee data
    await connection.query(`DELETE FROM employees WHERE id = ?`, [emp_id]);

    await connection.commit(); // Commit transaction

    res.json({ success: true });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  } finally {
    connection.release(); // Release connection
  }
});

export default router;
