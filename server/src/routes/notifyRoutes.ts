import { Router } from "express";
import { NotificationService } from "../services/NotificationService";

const router = Router();
const svc = new NotificationService();

// Endpoint your auth code calls after successful signup
router.post("/signup", async (req, res) => {
  const { userId, email, phone, name } = req.body;
  try {
    await svc.onSignup({ userId, email, phone, name });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err });
  }
});

// Endpoint your auth code calls after successful login
router.post("/login", async (req, res) => {
  const { userId, email, phone, ip, device } = req.body;
  try {
    await svc.onLogin({ userId, email, phone, ip, device });
    res.json({ ok: true });
  } catch (err) { 
    res.status(500).json({ ok: false, error: err });
  }
});

export default router;
