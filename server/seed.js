import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.model.js";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  const exists = await User.findOne({ email: "admin@autotrust.com" });
  if (exists) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    name: "AutoTrust Admin",
    email: "admin@autotrust.com",
    password: "Admin@1234",
    role: "admin",
    phone: "9999999999",
  });

  console.log("✅ Admin created!");
  console.log("   Email:    admin@autotrust.com");
  console.log("   Password: Admin@1234");
  process.exit();
};

createAdmin();