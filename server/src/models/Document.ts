import mongoose, { Document, Schema } from "mongoose";

export interface IDocument extends Document {
  name: string;
  size: number;
  cloudinaryUrl: string;
  uploadedBy: {
    name: string;
    email: string;
    department: string;
  };
  status: string;
  reviewerComments: string;
  uploadDate: Date;
}

const DocumentSchema = new Schema<IDocument>({
  name: String,
  size: Number,
  cloudinaryUrl: String,
  uploadDate: { type: Date, default: Date.now },

  uploadedBy: {
    name: String,
    email: String,
    department: String,
  },

  status: {
    type: String,
    default: "pending",
  },

  reviewerComments: {
    type: String,
    default: "Document uploaded successfully. Awaiting review.",
  },
});

export default mongoose.model<IDocument>("Document", DocumentSchema);
