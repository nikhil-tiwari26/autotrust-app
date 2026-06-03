import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../services/listingService.js";
import ImageUploader from "../components/listing/ImageUploader.jsx";
import { FiPlusCircle } from "react-icons/fi";

const CITIES = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Lucknow","Pune","Jaipur","Kolkata","Ahmedabad","Surat","Nagpur"];

export default function CreateListing() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", make: "", model: "", year: "", price: "", km: "",
    fuelType: "Petrol", transmission: "Manual", city: "", description: "",
    rcNumber: "", contactPhone: "",
  });

  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      images.forEach((img) => fd.append("images", img));
      await createListing(fd);
      alert("Listing submitted! It will go live after admin approval.");
      navigate("/listings");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <FiPlusCircle className="text-electric-400 text-3xl" />
        <div>
          <h1 className="text-2xl font-bold text-white">Post Your Car</h1>
          <p className="text-gray-400 text-sm">Fill in the details. Your listing will be live after admin review.</p>
        </div>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 mb-6 text-sm">{error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Listing Title</label>
            <input className="input" placeholder="e.g. 2019 Maruti Swift VXI — Single Owner" {...f("title")} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Make</label>
              <input className="input" placeholder="e.g. Maruti Suzuki" {...f("make")} required />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Model</label>
              <input className="input" placeholder="e.g. Swift" {...f("model")} required />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Year</label>
              <input className="input" type="number" placeholder="2019" min="2000" max={new Date().getFullYear()} {...f("year")} required />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Price (₹)</label>
              <input className="input" type="number" placeholder="450000" {...f("price")} required />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Odometer (km)</label>
              <input className="input" type="number" placeholder="45000" {...f("km")} required />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Fuel Type</label>
              <select className="input" {...f("fuelType")}>
                {["Petrol","Diesel","CNG","Electric","Hybrid"].map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Transmission</label>
              <select className="input" {...f("transmission")}>
                <option>Manual</option><option>Automatic</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">City</label>
              <select className="input" {...f("city")} required>
                <option value="">Select City</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">RC Number (optional)</label>
              <input className="input uppercase" placeholder="MH12AB1234" {...f("rcNumber")} />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Contact Phone</label>
              <input className="input" placeholder="9876543210" {...f("contactPhone")} required />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
            <textarea className="input" rows={4} placeholder="Describe the car's condition, features, reason for selling..." {...f("description")} />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Car Photos</label>
            <ImageUploader onChange={setImages} />
          </div>

          <button className="btn-primary w-full py-4 text-base" type="submit" disabled={loading}>
            {loading ? "Submitting listing..." : "Submit Listing for Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
