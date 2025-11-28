import User from "../models/User.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  try {
    // 1️⃣ Try User (email login)
    let account = await User.findOne({ email });

    // 2️⃣ Try Admin (username login using same input)
    if (!account) {
      account = await Admin.findOne({ username: email });
    }

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    const valid = await bcrypt.compare(password, account.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      status: true,
      data: {
        token,
        user: account
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error." });
  }
};
