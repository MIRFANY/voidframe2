import express from "express";
import { auth, adminOnly } from "../middleware/authMiddleware.js";

// If you have admin routes, import them here
// Example: import { getAdminDashboard } from "../controllers/adminAuthController.js";

const router = express.Router();

// Example admin protected route
router.get("/dashboard", auth, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

export default router;
