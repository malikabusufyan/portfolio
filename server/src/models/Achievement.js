const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
