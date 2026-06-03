import rateLimit, { ipKeyGenerator } from "express-rate-limit";

// General API rate limiter - 100 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  skip: (req) => process.env.NODE_ENV === "development", // Skip in development
});

// Strict limiter for auth endpoints - 5 attempts per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
  skipSuccessfulRequests: true, // Don't count successful requests
  skip: (req) => process.env.NODE_ENV === "development",
});

const userOrIpKeyGenerator = (req, res) => {
  return req.user?._id?.toString() || ipKeyGenerator(req, res);
};

// Moderate limiter for AI endpoints - 20 requests per hour per user
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: "Too many AI requests, please try again later.",
  keyGenerator: userOrIpKeyGenerator,
  skip: (req) => process.env.NODE_ENV === "development",
});

// Upload limiter - 10 listings per hour
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many listing uploads, please try again later.",
  keyGenerator: userOrIpKeyGenerator,
  skip: (req) => process.env.NODE_ENV === "development",
});
