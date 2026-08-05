const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Languages",
        "Frameworks/Libraries",
        "Tools",
        "CAD",
        "CAE",
        "Interpersonal",
      ],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
