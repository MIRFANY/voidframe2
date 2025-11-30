const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // simple string password
});

module.exports = mongoose.model("Client", ClientSchema);
