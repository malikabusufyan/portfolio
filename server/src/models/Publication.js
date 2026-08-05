const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    journal: { type: String, default: "" },
    description: { type: String, default: "" },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", publicationSchema);
