// import express, { Request, Response } from "express";
// import db from "../../lib/db"; // Adjust the path to your db.ts file
// import mysql from "mysql2"; // Ensure you have the mysql2 package installed

// const router = express.Router();

// // Fetch all users
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM users");
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // Register a new user and their address
// router.post("/", async (req: Request, res: Response) => {
//   const connection = await db.getConnection(); // Get connection for transaction

//   try {
//     const {
//       name,
//       lastname,
//       telephone,
//       email,
//       username,
//       password,
//       image,
//       address,
//       district,
//       amphoe,
//       province,
//       zipcode,
//     } = req.body; // Access the parsed JSON data

//     await connection.beginTransaction(); // Start transaction

//     // Insert user data
//     const [userResult] = (await connection.query(
//       `INSERT INTO users (name, lastname, telephone, email, username, password, image)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [name, lastname, telephone, email, username, password, image]
//     )) as [mysql.ResultSetHeader]; // Cast to ResultSetHeader

//     const userId = userResult.insertId; // Get the insertId

//     // Insert address data with the user's ID as a foreign key
//     await connection.query(
//       `INSERT INTO addresses (address_name, user_id, district, amphoe, province, zipcode)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [address, userId, district, amphoe, province, zipcode]
//     );

//     await connection.commit(); // Commit transaction

//     res.json({ success: true, userId });
//   } catch (error) {
//     await connection.rollback(); // Rollback transaction in case of error
//     console.error("Error inserting user or address:", error);
//     res.status(500).json({ error: "Failed to register user and address" });
//   } finally {
//     connection.release(); // Release connection
//   }
// });

// // Update user and address information
// router.put("/", async (req: Request, res: Response) => {
//   const connection = await db.getConnection(); // Get connection for transaction

//   try {
//     const {
//       userId,
//       name,
//       lastname,
//       telephone,
//       email,
//       username,
//       password,
//       image,
//       address,
//       district,
//       amphoe,
//       province,
//       zipcode,
//     } = req.body; // Access the parsed JSON data

//     await connection.beginTransaction(); // Start transaction

//     // Update user data
//     await connection.query(
//       `UPDATE users SET name = ?, lastname = ?, telephone = ?, email = ?, username = ?, password = ?, image = ?
//        WHERE id = ?`,
//       [name, lastname, telephone, email, username, password, image, userId]
//     );

//     // Update address data
//     await connection.query(
//       `UPDATE addresses SET address_name = ?, district = ?, amphoe = ?, province = ?, zipcode = ?
//        WHERE user_id = ?`,
//       [address, district, amphoe, province, zipcode, userId]
//     );

//     await connection.commit(); // Commit transaction

//     res.json({ success: true });
//   } catch (error) {
//     await connection.rollback(); // Rollback transaction in case of error
//     console.error("Error updating user or address:", error);
//     res.status(500).json({ error: "Failed to update user and address" });
//   } finally {
//     connection.release(); // Release connection
//   }
// });

// // Delete user and associated address
// router.delete("/", async (req: Request, res: Response) => {
//   const connection = await db.getConnection(); // Get connection for transaction

//   try {
//     const { userId } = req.body; // Access the parsed JSON data

//     await connection.beginTransaction(); // Start transaction

//     // Delete address data first (address table should have FK constraint)
//     await connection.query(`DELETE FROM addresses WHERE user_id = ?`, [userId]);

//     // Then delete user data
//     await connection.query(`DELETE FROM users WHERE id = ?`, [userId]);

//     await connection.commit(); // Commit transaction

//     res.json({ success: true });
//   } catch (error) {
//     await connection.rollback(); // Rollback transaction in case of error
//     console.error("Error deleting user or address:", error);
//     res.status(500).json({ error: "Failed to delete user and address" });
//   } finally {
//     connection.release(); // Release connection
//   }
// });

// export default router;
