const express = require("express");
const ContactMessage = require("../models/ContactMessage");
const { sendContactMail } = require("../utils/mailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required" });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }

  const doc = await ContactMessage.create({ name, email, subject, message });

  try {
    await sendContactMail({ name, email, subject, message });
    doc.mailSent = true;
    await doc.save();
  } catch (err) {
    console.error("Failed to send contact email:", err.message);
  }

  res.status(201).json({ message: "Message received" });
});

module.exports = router;
