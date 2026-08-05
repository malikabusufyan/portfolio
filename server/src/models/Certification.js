const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, default: "" },
    items: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certification", certificationSchema);
