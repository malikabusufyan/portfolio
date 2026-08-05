const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const admin = await Admin.findOne({ email: String(email).toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { sub: admin._id.toString(), email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  res.json({ token, email: admin.email });
});

module.exports = router;
