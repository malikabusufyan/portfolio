const express = require("express");
const requireAuth = require("../middleware/auth");

// Builds a standard public-read / admin-write CRUD router for a Mongoose model.
function buildCrudRouter(Model) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const items = await Model.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  });

  router.post("/", requireAuth, async (req, res) => {
    const created = await Model.create(req.body);
    res.status(201).json(created);
  });

  router.put("/:id", requireAuth, async (req, res) => {
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  });

  router.delete("/:id", requireAuth, async (req, res) => {
    const deleted = await Model.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  });

  return router;
}

module.exports = buildCrudRouter;
