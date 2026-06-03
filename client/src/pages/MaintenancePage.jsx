import { useState } from "react";
import { getMaintenanceCost } from "../services/vehicleService.js";
import MaintenanceTable from "../components/vehicle/MaintenanceTable.jsx";
import Loader from "../components/common/Loader.jsx";
import { FiTool } from "react-icons/fi";

const MAKES = ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia", "Renault", "Volkswagen", "Skoda"];

export default function MaintenancePage() {
  const [form, setForm] = useState({ make: "", model: "", year: "", km: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const f = (field) => ({ value: form[field], onChange: (e) => setForm({ ...form, [field]: e.target.value }) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true); setResult(null);
    try {
      const res = await getMaintenanceCost(form);
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not generate estimate. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-electric-500/10 rounded-2xl mb-4">
          <FiTool className="text-electric-400 text-2xl" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Maintenance Cost Estimator</h1>
        <p className="text-gray-400 max-w-xl mx-auto">Enter the car details and our AI will estimate upcoming service costs for the next 20,000 km — before you buy.</p>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Car Make</label>
            <select className="input" {...f("make")} required>
              <option value="">Select Make</option>
              {MAKES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Model</label>
            <input className="input" placeholder="e.g. Swift, City, Creta" {...f("model")} required />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Year of Manufacture</label>
            <input className="input" type="number" placeholder="e.g. 2019" min="2000" max={new Date().getFullYear()} {...f("year")} required />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Current Odometer (km)</label>
            <input className="input" type="number" placeholder="e.g. 65000" min="0" {...f("km")} required />
          </div>
          <div className="sm:col-span-2">
            <button className="btn-primary w-full py-4" type="submit" disabled={loading}>
              {loading ? "AI is calculating..." : "Get Maintenance Estimate"}
            </button>
          </div>
        </form>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 mb-6">{error}</div>}
      {loading && <Loader text="AI is estimating your maintenance costs..." />}

      {result && (
        <div className="card">
          <h3 className="text-white font-semibold text-xl mb-6">
            Cost Estimate — {form.year} {form.make} {form.model}
          </h3>
          <MaintenanceTable items={result.items} totalEstimate={result.totalEstimate} advice={result.advice} />
        </div>
      )}
    </div>
  );
}
