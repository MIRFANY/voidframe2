const express = require("express");
const router = express.Router();
const Document = require("../models/Document");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "documents",
    resource_type: "raw", // allows pdf/doc/xlsx
  },
});

const upload = multer({ storage });

// Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const doc = new Document({
      ownerId: req.body.ownerId,
      title: req.body.title,
      cloudinaryUrl: req.file.path,
    });

    await doc.save();
    res.json({ message: "Document Uploaded", doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
