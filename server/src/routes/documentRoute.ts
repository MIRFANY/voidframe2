import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Document from "../models/Document";

const router = express.Router();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Multer Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "dpr-docs",
    resource_type: "raw", // PDF / DOC / ANY file
  } as any,
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file as any;
    const { name, email, department } = req.body;

    const doc = await Document.create({
      name: file.originalname,
      size: file.size,
      cloudinaryUrl: file.path,
      uploadedBy: { name, email, department },
      status: "pending",
      reviewerComments: "Document uploaded successfully. Awaiting review.",
    });

    res.json({
      success: true,
      message: "Document uploaded & stored successfully",
      document: doc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

export default router;
