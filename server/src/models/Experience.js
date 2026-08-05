const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: "" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    bullets: { type: [String], default: [] },
    logo: { type: String, default: "" },
    type: { type: String, enum: ["work", "internship"], default: "work" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
