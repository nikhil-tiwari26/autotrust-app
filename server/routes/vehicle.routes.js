import express from "express";
import { lookupVehicle, saveReport, getSavedReports, removeReport } from "../controllers/vehicle.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateRcNumber } from "../middleware/validation.middleware.js";

const router = express.Router();
router.get("/:rcNumber", validateRcNumber, lookupVehicle);
router.post("/save", protect, saveReport);
router.get("/saved/all", protect, getSavedReports);
router.delete("/saved/:vehicleId", protect, removeReport);
export default router;
