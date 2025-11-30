const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/document", require("./routes/documentRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
