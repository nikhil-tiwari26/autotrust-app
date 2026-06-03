import Vehicle from "../models/Vehicle.model.js";
import User from "../models/User.model.js";
import { fetchVehicleData } from "../services/apiSetu.service.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const lookupVehicle = async (req, res) => {
  try {
    const { rcNumber } = req.params;
    const rc = rcNumber.toUpperCase().trim();
    // Check cache in DB (fetched within last 24 hours)
    const cached = await Vehicle.findOne({
      rcNumber: rc,
      fetchedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    if (cached) return successResponse(res, cached, "Vehicle data fetched (cached)");
    const vehicleData = await fetchVehicleData(rc);
    const vehicle = await Vehicle.findOneAndUpdate(
      { rcNumber: rc },
      { ...vehicleData, fetchedAt: new Date() },
      { upsert: true, new: true }
    );
    return successResponse(res, vehicle, "Vehicle data fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const saveReport = async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const user = await User.findById(req.user._id);
    if (user.savedReports.includes(vehicleId))
      return errorResponse(res, "Report already saved", 400);
    user.savedReports.push(vehicleId);
    await user.save();
    await Vehicle.findByIdAndUpdate(vehicleId, { $addToSet: { savedBy: req.user._id } });
    return successResponse(res, null, "Report saved successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getSavedReports = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedReports");
    return successResponse(res, user.savedReports);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const removeReport = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    await User.findByIdAndUpdate(req.user._id, { $pull: { savedReports: vehicleId } });
    return successResponse(res, null, "Report removed");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
