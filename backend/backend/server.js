import dotenv from "dotenv";
dotenv.config();   // LOAD ENV FIRST – AT THE VERY TOP

import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dprRoutes from "./routes/dprRoutes.js";

connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dpr", dprRoutes);

app.listen(3001, () => console.log("Server running on 3001"));
