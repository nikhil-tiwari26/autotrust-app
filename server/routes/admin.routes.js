import express from "express";
import { getAllUsers, deleteUser, toggleUserStatus, getAllListings, approveListing, rejectListing, getStats } from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();
router.use(protect, adminOnly);
router.get("/stats", getStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/toggle", toggleUserStatus);
router.get("/listings", getAllListings);
router.put("/listings/:id/approve", approveListing);
router.put("/listings/:id/reject", rejectListing);
export default router;
