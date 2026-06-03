import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { errorResponse } from "../utils/responseHandler.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return errorResponse(res, "Not authorized, no token", 401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return errorResponse(res, "User not found", 401);
    next();
  } catch (error) {
    return errorResponse(res, "Invalid token", 401);
  }
};
