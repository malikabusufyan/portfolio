const express = require("express");
const requireAuth = require("../middleware/auth");
const ContactMessage = require("../models/ContactMessage");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.patch("/:id", requireAuth, async (req, res) => {
  const updated = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: req.body.read !== undefined ? req.body.read : true },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
