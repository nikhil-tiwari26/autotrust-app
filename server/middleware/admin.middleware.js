import { errorResponse } from "../utils/responseHandler.js";

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return errorResponse(res, "Access denied. Admins only.", 403);
};
