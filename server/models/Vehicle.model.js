import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    rcNumber: { type: String, required: true, uppercase: true, trim: true },
    ownerName: { type: String, default: "N/A" },
    ownerCount: { type: Number, default: 1 },
    registrationDate: { type: String, default: "N/A" },
    vehicleClass: { type: String, default: "N/A" },
    fuelType: { type: String, default: "N/A" },
    make: { type: String, default: "N/A" },
    model: { type: String, default: "N/A" },
    color: { type: String, default: "N/A" },
    insuranceValidity: { type: String, default: "N/A" },
    insuranceActive: { type: Boolean, default: false },
    challanDues: { type: Number, default: 0 },
    hypothecation: { type: Boolean, default: false },
    fitnessUpto: { type: String, default: "N/A" },
    aiRiskScore: { type: Number, default: null },
    aiExplanation: { type: String, default: "" },
    aiRedFlags: [{ type: String }],
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);
