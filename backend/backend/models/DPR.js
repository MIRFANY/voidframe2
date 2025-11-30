import mongoose from "mongoose";

const dprSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    fileUrl: String,
    publicId: String,

    uploadedBy: {
      type: String,
      default: "client",   // STATIC — always client
    },

    risk: Number,
    completeness: Number,

    evaluationData: {
      evaluation: String,      // AI final report
      issues: Array,           // list of issues
      highlighted_pdf: String, // annotated PDF download link
      raw: Object              // raw full FastAPI result
    },
  },
  { timestamps: true }
);

export default mongoose.model("DPR", dprSchema);
