const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const requireAuth = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return res.status(500).json({ message: "Image hosting is not configured on the server" });
  }

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "portfolio", resource_type: "image" },
      (err, uploaded) => (err ? reject(err) : resolve(uploaded))
    );
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  });

  res.status(201).json({ url: result.secure_url });
});

router.use((err, req, res, next) => {
  res.status(400).json({ message: err.message || "Upload failed" });
});

module.exports = router;
