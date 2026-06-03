import { formatDate } from "../../utils/formatters.js";
import { FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";

export default function VehicleCard({ vehicle }) {
  const InfoRow = ({ label, value, status }) => (
    <div className="flex justify-between items-center py-3 border-b border-white/5">
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        {status === "good" && <FiCheckCircle className="text-green-400" />}
        {status === "bad" && <FiXCircle className="text-red-400" />}
        {status === "warn" && <FiAlertTriangle className="text-yellow-400" />}
        <span className="text-white text-sm font-medium">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{vehicle.make} {vehicle.model}</h2>
          <p className="text-electric-400 font-mono text-sm mt-1">{vehicle.rcNumber}</p>
        </div>
        <span className="bg-electric-500/20 text-electric-400 px-3 py-1 rounded-full text-xs font-medium">
          {vehicle.vehicleClass}
        </span>
      </div>

      <div className="space-y-0">
        <InfoRow label="Owner Name" value={vehicle.ownerName} />
        <InfoRow label="No. of Owners" value={vehicle.ownerCount} status={vehicle.ownerCount > 2 ? "warn" : "good"} />
        <InfoRow label="Registration Date" value={formatDate(vehicle.registrationDate)} />
        <InfoRow label="Fuel Type" value={vehicle.fuelType} />
        <InfoRow label="Color" value={vehicle.color} />
        <InfoRow label="Insurance Valid Until" value={formatDate(vehicle.insuranceValidity)} status={vehicle.insuranceActive ? "good" : "bad"} />
        <InfoRow label="Challan Dues" value={`₹${vehicle.challanDues}`} status={vehicle.challanDues > 0 ? "warn" : "good"} />
        <InfoRow label="Hypothecation (Loan)" value={vehicle.hypothecation ? "Yes" : "No"} status={vehicle.hypothecation ? "bad" : "good"} />
        <InfoRow label="Fitness Certificate" value={formatDate(vehicle.fitnessUpto)} />
      </div>
    </div>
  );
}
