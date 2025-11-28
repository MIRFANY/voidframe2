// backend/routes/dprRoutes.js
import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import { 
  uploadDPR, 
  getAllDPRs, 
  getMyDPRs 
} from "../controllers/dprController.js";

const router = express.Router();

// Upload DPR
router.post("/upload", auth, upload.single("file"), uploadDPR);

// Admin → Get all DPRs
router.get("/all", auth, getAllDPRs);

// Client → Get only client DPRs



export default router;
