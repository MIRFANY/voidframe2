// seed/dummyUserSeeder.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// ==== MONGO CONNECTION ====
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

// ==== USER SCHEMA ====
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  department: String,
});

const User = mongoose.model("User", userSchema);

// ==== DUMMY USERS ====
const dummyUsers = [
  {
    username: "mdoneradmin",
    name: "MDoNER Admin",
    email: "mdoner.admin@gov.in",
    password: "MDoNER@2025",
    role: "admin",
    department: "MDoNER"
  },
  {
    username: "clientuser",
    name: "Client User",
    email: "client.user@project.in",
    password: "Client@2025",
    role: "client",
    department: "External Client"
  }
];


async function seedUsers() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to DB!");

    for (let user of dummyUsers) {
      const exists = await User.findOne({ email: user.email });
      if (exists) {
        console.log(`⚠️ User already exists: ${user.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      await User.create(user);
      console.log(`✔️ Inserted: ${user.email}`);
    }

    console.log("🎉 Dummy users inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
