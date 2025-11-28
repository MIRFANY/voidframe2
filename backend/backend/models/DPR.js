// backend/models/DPR.js
import mongoose from "mongoose";

const dprSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    fileUrl: String,
    publicId: String,

    risk: Number,
    completeness: Number,
    analysis: Object,

    uploadedBy: {
      type: String,    // ← YOU WANT TO SAVE "client" HERE
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DPR", dprSchema);
