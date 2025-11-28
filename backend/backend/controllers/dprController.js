// backend/controllers/dprController.js
import DPR from "../models/DPR.js";
import cloudinary from "../config/cloudinary.js";

// Convert upload_stream → Promise
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "dpr",
        resource_type: "raw", // required for PDF
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export const uploadDPR = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ status: false, message: "No file uploaded" });

    const { uploadedBy, title, risk, completeness, analysis } = req.body;

    // Upload PDF → Cloudinary
    const pdf = await uploadToCloudinary(req.file.buffer);

    // Parse analysis JSON (safe)
    let parsedAnalysis = {};
    try {
      parsedAnalysis = typeof analysis === "string" ? JSON.parse(analysis) : analysis;
    } catch {
      parsedAnalysis = { error: "Invalid analysis format" };
    }

    // Save DPR entry into DB
    const dpr = await DPR.create({
      title: title || req.file.originalname,
      description: "AI-evaluated DPR document",
      fileUrl: pdf.secure_url,
      publicId: pdf.public_id,
      risk: Number(risk || 0),
      completeness: Number(completeness || 0),
      analysis: parsedAnalysis,
    uploadedBy: uploadedBy || "client", 
    });

    return res.json({
      status: true,
      message: "DPR uploaded successfully",
      data: dpr,
    });
  } catch (err) {
    console.error("DPR UPLOAD ERROR:", err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// controllers/dprController.js

export const getAllDPRs = async (req, res) => {
  try {
    const dprs = await DPR.find().sort({ createdAt: -1 });
    res.json({ status: true, data: dprs });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};


export const getMyDPRs = async (req, res) => {
  try {
    const dprs = await DPR.find().sort({ createdAt: -1 });
    res.json({ status: true, data: dprs });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};