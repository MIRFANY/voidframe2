const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  title: String,
  cloudinaryUrl: String, // store URL after upload
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", DocumentSchema);
