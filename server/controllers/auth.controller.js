import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !password) return errorResponse(res, "All fields are required", 400);
    const exists = await User.findOne({ email });
    if (exists) return errorResponse(res, "Email already registered", 400);
    const user = await User.create({ name, email, password, role: role || "buyer", phone });
    const token = generateToken(user._id);
    return successResponse(res, {
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    }, "Registered successfully", 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return errorResponse(res, "Invalid email or password", 401);
    if (!user.isActive) return errorResponse(res, "Account deactivated. Contact admin.", 403);
    const token = generateToken(user._id);
    return successResponse(res, {
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    }, "Login successful");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate("savedReports");
    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
