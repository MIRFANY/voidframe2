// backend/controllers/dprController.js
import DPR from "../models/DPR.js";
import cloudinary from "../config/cloudinary.js";

// Convert upload_stream → Promise
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "dpr",
        resource_type: "raw" // required for PDFs
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

    const { title, risk, completeness, analysis } = req.body; 
    // 🔥 NOTE: Frontend sends analysis as:
    // backend.append("analysis", JSON.stringify(aiData));

    // -------------------------------------------
    // CLOUDINARY UPLOAD
    // -------------------------------------------
    const pdf = await uploadToCloudinary(req.file.buffer);

    // -------------------------------------------
    // SAFE PARSE AI DATA
    // -------------------------------------------
    let parsed = {};

    try {
      parsed = typeof analysis === "string" ? JSON.parse(analysis) : analysis;
    } catch (err) {
      console.log("❌ ANALYSIS JSON PARSE ERROR:", err);
      parsed = {};
    }

    // FastAPI returns:
    // {
    //   evaluation: "...",
    //   issues: [...],
    //   highlighted_pdf: "annotated/xxx.pdf"
    // }

    const evaluation = parsed.evaluation || "";
    const issues = parsed.issues || [];
    const highlighted_pdf = parsed.highlighted_pdf || null;

    // -------------------------------------------
    // SAVE DPR TO DATABASE
    // -------------------------------------------
    const dpr = await DPR.create({
      title: title || req.file.originalname,
      description: "AI evaluated DPR document",

      fileUrl: pdf.secure_url,
      publicId: pdf.public_id,

      risk: Number(risk || 0),
      completeness: Number(completeness || 0),

      uploadedBy: "client", // 🔥 always static

      evaluationData: {
        evaluation,
        issues,
        highlighted_pdf,
        raw: parsed, // store entire AI response
      }
    });

    return res.json({
      status: true,
      message: "DPR uploaded successfully",
      data: dpr,
    });
  } catch (err) {
    console.error("❌ DPR UPLOAD ERROR:", err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// --------------------------------------------------------
// GET ALL DPRs
// --------------------------------------------------------
export const getAllDPRs = async (req, res) => {
  try {
    const dprs = await DPR.find().sort({ createdAt: -1 });
    res.json({ status: true, data: dprs });
  } catch {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// --------------------------------------------------------
// GET My DPRs (FILTER BY USER EMAIL)
// --------------------------------------------------------
export const getMyDPRs = async (req, res) => {
  try {
    // Future improvement: filter by req.user.email
    const dprs = await DPR.find().sort({ createdAt: -1 });
    res.json({ status: true, data: dprs });
  } catch {
    res.status(500).json({ status: false, message: "Server error" });
  }
};
