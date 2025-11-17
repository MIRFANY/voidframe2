import express from "express";
import dotenv from "dotenv";
import notifyRoutes from "./routes/notifyRoutes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/notify", notifyRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Notification service running on ${port}`));
