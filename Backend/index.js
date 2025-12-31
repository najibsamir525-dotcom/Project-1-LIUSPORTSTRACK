import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "liusportstrack",
  port: 3306,
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length > 0)
        return res.status(400).json({ message: "Email already registered" });

      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password], 
        (err, result) => {
          if (err) return res.status(500).json({ message: "Server error" });
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length === 0)
        return res.status(401).json({ message: "Invalid email or password" });

      res.json({ message: "Login successful", user: results[0] });
    }
  );
});
app.get("/home-plan", (req, res) => {
  try {
    db.query("SELECT * FROM home_plan", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      if (!results.length) return res.json([]);
      res.json(results);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/activities", (req, res) => {
  try {
    db.query("SELECT * FROM activity", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      res.json(results);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/activities", (req, res) => {
  try {
    const { title, details } = req.body;
    if (!title || !details) return res.status(400).json({ message: "All fields required" });

    db.query(
      "INSERT INTO activity (title, details) VALUES (?, ?)",
      [title, details],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to add activity" });
        }
        res.status(201).json({ message: "Activity added", id: result.insertId });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/activities/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Activity ID is required" });
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Activity ID must be a number" });
  }

  const q = "DELETE FROM activity WHERE id = ?";

  db.query(q, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }

    return res.status(200).json({ message: "Activity deleted successfully" });
  });
});


app.put("/activities/:id", (req, res) => {
  const { id } = req.params;
  const { title, details } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Valid activity ID is required" });
  }

  if (!title || !details) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const q = "UPDATE activity SET title = ?, details = ? WHERE id = ?";

  db.query(q, [title, details, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }

    return res.status(200).json({ message: "Activity updated successfully" });
  });
});


app.post("/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "All fields required" });

    db.query(
      "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)",
      [name, email, message],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to save message" });
        }
        res.status(201).json({ message: "Message received" });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});