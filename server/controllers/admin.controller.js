import User from "../models/User.model.js";
import Listing from "../models/Listing.model.js";
import Vehicle from "../models/Vehicle.model.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select("-password").sort({ createdAt: -1 });
    return successResponse(res, users);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return successResponse(res, null, "User deleted");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return errorResponse(res, "User not found", 404);
    user.isActive = !user.isActive;
    await user.save();
    return successResponse(res, { isActive: user.isActive }, `User ${user.isActive ? "activated" : "deactivated"}`);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("seller", "name email").sort({ createdAt: -1 });
    return successResponse(res, listings);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const approveListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    if (!listing) return errorResponse(res, "Listing not found", 404);
    return successResponse(res, listing, "Listing approved");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const rejectListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    if (!listing) return errorResponse(res, "Listing not found", 404);
    return successResponse(res, listing, "Listing rejected");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getStats = async (req, res) => {
  try {
    const [totalUsers, totalListings, pendingListings, totalReports] = await Promise.all([
      User.countDocuments({ role: { $ne: "admin" } }),
      Listing.countDocuments(),
      Listing.countDocuments({ status: "pending" }),
      Vehicle.countDocuments(),
    ]);
    return successResponse(res, { totalUsers, totalListings, pendingListings, totalReports });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
