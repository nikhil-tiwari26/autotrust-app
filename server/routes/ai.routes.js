import express from "express";
import { getRiskScore, getMaintenanceCost } from "../controllers/ai.controller.js";
import { aiLimiter } from "../middleware/rateLimiter.middleware.js";
import { validateRiskScore, validateMaintenanceCost } from "../middleware/validation.middleware.js";

const router = express.Router();
router.post("/risk-score", aiLimiter, validateRiskScore, getRiskScore);
router.post("/maintenance", aiLimiter, validateMaintenanceCost, getMaintenanceCost);
export default router;
