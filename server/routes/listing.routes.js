import express from "express";
import { getListings, getListingById, createListing, updateListing, deleteListing, getMyListings } from "../controllers/listing.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadLimiter } from "../middleware/rateLimiter.middleware.js";
import { uploadImages } from "../middleware/upload.middleware.js";
import { validateCreateListing, validateListingsQuery } from "../middleware/validation.middleware.js";

const router = express.Router();
router.get("/", validateListingsQuery, getListings);
router.get("/my", protect, getMyListings);
router.get("/:id", getListingById);
router.post("/create", protect, uploadLimiter, uploadImages, validateCreateListing, createListing);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);
export default router;
