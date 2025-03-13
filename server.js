const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define User Schema & Model
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  termsAccepted: { type: Boolean, default: false }, // ✅ Users must accept before signing up
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

//  API Health Check
app.get("/", (req, res) => {
  res.send("🚀 SIPS Backend is Running!");
});

//  Check if user has accepted terms before signing up
app.get("/check-terms", async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ termsAccepted: false });
    }
    res.json({ termsAccepted: user.termsAccepted });
  } catch (error) {
    console.error("Error checking terms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Accept Terms & Conditions (Before Signup)
app.post("/accept-terms", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ username });

    if (!user) {
      // If user doesn't exist, create a temporary record for terms
      user = new User({ username, termsAccepted: true, fullName: "", password: "" });
    } else {
      // Update existing user record
      user.termsAccepted = true;
    }

    await user.save();
    res.json({ message: "Terms accepted", termsAccepted: true });
  } catch (error) {
    console.error("Error updating terms acceptance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Register Route (Users Must Accept Terms First)
app.post("/register", async (req, res) => {
  const { username, fullName, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Check if user exists and has accepted terms
    const existingUser = await User.findOne({ username });
    if (!existingUser || !existingUser.termsAccepted) {
      return res.status(400).json({ error: "You must accept Terms and Conditions before signing up" });
    }

    if (existingUser.fullName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password and complete user registration
    const hashedPassword = await bcrypt.hash(password, 10);
    existingUser.fullName = fullName;
    existingUser.password = hashedPassword;

    await existingUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

//  Login Route (Authenticates User from MongoDB)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Find user in MongoDB
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
