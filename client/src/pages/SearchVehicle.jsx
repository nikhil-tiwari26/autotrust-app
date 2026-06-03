import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiAlertCircle } from "react-icons/fi";

export default function SearchVehicle() {
  const [rc, setRc] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const cleaned = rc.toUpperCase().replace(/\s/g, "");
    if (cleaned.length < 6) { setError("Please enter a valid RC number"); return; }
    navigate(`/report/${cleaned}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="inline-block bg-electric-500/10 text-electric-400 border border-electric-500/30 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
          Free Vehicle Check
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Check Any Vehicle's History</h1>
        <p className="text-gray-400 mb-10 text-lg">Enter the registration number to get owner history, insurance, challans and an AI risk score instantly.</p>

        <div className="card">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                className="input pl-12 text-lg py-4 tracking-widest uppercase"
                placeholder="e.g. MH12AB1234"
                value={rc}
                onChange={(e) => { setRc(e.target.value); setError(""); }}
                maxLength={12}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <FiAlertCircle />{error}
              </div>
            )}
            <button className="btn-primary w-full py-4 text-base" type="submit">
              Check Vehicle Now
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-4">Data fetched from Parivahan, Government of India. Results may take a few seconds.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          {[["Owner History", "Know every previous owner"], ["Insurance Status", "Check if policy is valid"], ["Challan Dues", "See pending fines"]].map(([t, d]) => (
            <div key={t} className="card border-white/5">
              <p className="text-white font-semibold text-sm">{t}</p>
              <p className="text-gray-500 text-xs mt-1">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
