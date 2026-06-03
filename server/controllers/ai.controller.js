import Vehicle from "../models/Vehicle.model.js";
import { generateRiskScore, generateMaintenanceCost } from "../services/openrouter.service.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const getRiskScore = async (req, res) => {
  try {
    const { rcNumber } = req.body;
    if (!rcNumber) return errorResponse(res, "RC number is required", 400);
    const vehicle = await Vehicle.findOne({ rcNumber: rcNumber.toUpperCase() });
    if (!vehicle) return errorResponse(res, "Please fetch vehicle data first", 404);
    // Return cached AI result if already generated
    if (vehicle.aiRiskScore !== null) {
      return successResponse(res, {
        riskScore: vehicle.aiRiskScore,
        explanation: vehicle.aiExplanation,
        redFlags: vehicle.aiRedFlags,
      }, "Risk score fetched (cached)");
    }
    const aiResult = await generateRiskScore(vehicle);
    await Vehicle.findByIdAndUpdate(vehicle._id, {
      aiRiskScore: aiResult.riskScore,
      aiExplanation: JSON.stringify({ verdict: aiResult.verdict, summary: aiResult.summary, positives: aiResult.positives }),
      aiRedFlags: aiResult.redFlags,
    });
    return successResponse(res, aiResult, "AI risk analysis complete");
  } catch (error) {
    return errorResponse(res, "AI analysis failed: " + error.message);
  }
};

export const getMaintenanceCost = async (req, res) => {
  try {
    const { make, model, year, km } = req.body;
    if (!make || !model || !year || !km)
      return errorResponse(res, "Make, model, year and km are required", 400);
    const result = await generateMaintenanceCost({ make, model, year, km });
    return successResponse(res, result, "Maintenance estimate generated");
  } catch (error) {
    return errorResponse(res, "Maintenance estimation failed: " + error.message);
  }
};
