import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import notifyRoutes from "./routes/notifyRoutes";
import documentRoute from "./routes/documentRoute";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();

connectDB(); 

// Routes 
app.use(cors());
app.use(express.json());

app.use("/documents", documentRoute);
app.use("/notify", notifyRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`service running on ${port}`));
