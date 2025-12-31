import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/*
  DB connection
  Uses Railway environment variables
*/
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

/*
  Server
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

/*
  AUTH
*/
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [results] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (results.length === 0)
      return res.status(401).json({ message: "Invalid email or password" });

    res.json({ message: "Login successful", user: results[0] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/*
  HOME PLAN
*/
app.get("/home-plan", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM home_plan");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/*
  ACTIVITIES
*/
app.get("/activities", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM activity");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/activities", async (req, res) => {
  const { title, details } = req.body;

  if (!title || !details)
    return res.status(400).json({ message: "All fields required" });

  try {
    const [result] = await db.query(
      "INSERT INTO activity (title, details) VALUES (?, ?)",
      [title, details]
    );

    res.status(201).json({
      message: "Activity added",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to add activity" });
  }
});

app.put("/activities/:id", async (req, res) => {
  const { id } = req.params;
  const { title, details } = req.body;

  if (!id || isNaN(id))
    return res.status(400).json({ message: "Valid activity ID is required" });

  if (!title || !details)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [result] = await db.query(
      "UPDATE activity SET title = ?, details = ? WHERE id = ?",
      [title, details, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Activity not found" });

    res.json({ message: "Activity updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

app.delete("/activities/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id))
    return res.status(400).json({ message: "Valid activity ID is required" });

  try {
    const [result] = await db.query(
      "DELETE FROM activity WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Activity not found" });

    res.json({ message: "Activity deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

/*
  CONTACT
*/
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields required" });

  try {
    await db.query(
      "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.status(201).json({ message: "Message received" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save message" });
  }
});
