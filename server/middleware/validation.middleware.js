import { body, param, query, validationResult } from "express-validator";

// Custom error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.param, message: e.msg })),
    });
  }
  next();
};

// Auth validations
export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
  body("phone")
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Valid 10-digit phone number required"),
  handleValidationErrors,
];

export const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
  handleValidationErrors,
];

// Listing validations
export const validateCreateListing = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be 5-100 characters"),
  body("make")
    .trim()
    .notEmpty()
    .withMessage("Make is required"),
  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required"),
  body("year")
    .isInt({ min: 2000, max: new Date().getFullYear() })
    .withMessage(`Year must be between 2000 and ${new Date().getFullYear()}`),
  body("price")
    .isInt({ min: 10000 })
    .withMessage("Price must be at least ₹10,000"),
  body("km")
    .isInt({ min: 0 })
    .withMessage("Odometer must be a valid number"),
  body("fuelType")
    .isIn(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"])
    .withMessage("Invalid fuel type"),
  body("transmission")
    .isIn(["Manual", "Automatic"])
    .withMessage("Invalid transmission type"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("contactPhone")
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Valid 10-digit contact phone required"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),
  body("rcNumber")
    .optional()
    .trim()
    .matches(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)
    .withMessage("Invalid RC number format"),
  handleValidationErrors,
];

// Vehicle lookup validation
export const validateRcNumber = [
  param("rcNumber")
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)
    .withMessage("Invalid RC number format. Example: MH12AB1234"),
  handleValidationErrors,
];

// AI validations
export const validateRiskScore = [
  body("rcNumber")
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)
    .withMessage("Invalid RC number format"),
  handleValidationErrors,
];

export const validateMaintenanceCost = [
  body("make")
    .trim()
    .notEmpty()
    .withMessage("Make is required"),
  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required"),
  body("year")
    .isInt({ min: 2000, max: new Date().getFullYear() })
    .withMessage("Invalid year"),
  body("km")
    .isInt({ min: 0 })
    .withMessage("Odometer must be a valid number"),
  handleValidationErrors,
];

// Query param validations
export const validateListingsQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive number"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
  query("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("minPrice must be a positive number"),
  query("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("maxPrice must be a positive number"),
  handleValidationErrors,
];
