const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // simple string password as you asked
});

module.exports = mongoose.model("Admin", AdminSchema);
