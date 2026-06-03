import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    km: { type: Number, required: true },
    fuelType: { type: String, enum: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"], required: true },
    transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
    city: { type: String, required: true },
    description: { type: String, default: "" },
    images: [{ type: String }],
    rcNumber: { type: String, default: "" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    views: { type: Number, default: 0 },
    contactPhone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
