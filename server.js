const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// This sends a message to indicate that SIPS is running on backend
app.get("/", (req, res) => {
  res.send(" SIPS Backend is Running!");
});

const users = [];

// Stores Users in Memory; instead of using MongoDB
app.post("/register", async (req, res) => {
  const { username, fullName, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Checks if username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, fullName, password: hashedPassword };
  users.push(newUser); // Stores user in memory (temporary)

  res.status(201).json({ message: "User registered successfully!" });
});

// Login Route (Matches Users Stored in Memory)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Find user in the temporary in-memory storage
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid password" });
  }

  res.status(200).json({ message: "Login successful!" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
