import 'dotenv/config';
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { apiLimiter, authLimiter, aiLimiter, uploadLimiter } from "./middleware/rateLimiter.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting - apply general limiter to all requests
if (process.env.NODE_ENV === "production") {
  app.use(apiLimiter);
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/admin", adminRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "🚗 AutoTrust API is running" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 AutoTrust Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();