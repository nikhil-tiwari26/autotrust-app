import Listing from "../models/Listing.model.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const getListings = async (req, res) => {
  try {
    const { city, fuelType, minPrice, maxPrice, make, page = 1, limit = 9 } = req.query;
    const filter = { status: "approved" };
    if (city) filter.city = new RegExp(city, "i");
    if (fuelType) filter.fuelType = fuelType;
    if (make) filter.make = new RegExp(make, "i");
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const total = await Listing.countDocuments(filter);
    const listings = await Listing.find(filter)
      .populate("seller", "name phone")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    return successResponse(res, { listings, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("seller", "name phone email");
    if (!listing) return errorResponse(res, "Listing not found", 404);
    listing.views += 1;
    await listing.save();
    return successResponse(res, listing);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const createListing = async (req, res) => {
  try {
    const images = req.files?.map((f) => f.path) || [];
    const listing = await Listing.create({ ...req.body, seller: req.user._id, images });
    return successResponse(res, listing, "Listing submitted for approval", 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return errorResponse(res, "Listing not found", 404);
    if (listing.seller.toString() !== req.user._id.toString())
      return errorResponse(res, "Not authorized", 403);
    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return successResponse(res, updated, "Listing updated");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return errorResponse(res, "Listing not found", 404);
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return errorResponse(res, "Not authorized", 403);
    await listing.deleteOne();
    return successResponse(res, null, "Listing deleted");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, listings);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
