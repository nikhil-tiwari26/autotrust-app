import { useEffect, useState } from "react";
import { getListings } from "../services/listingService.js";
import ListingCard from "../components/listing/ListingCard.jsx";
import Loader from "../components/common/Loader.jsx";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Lucknow", "Pune", "Jaipur", "Kolkata", "Ahmedabad"];
const FUELS  = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];

export default function Listings() {
  const [listings, setListings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [total, setTotal]         = useState(0);
  const [page, setPage]           = useState(1);
  const [pages, setPages]         = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters]     = useState({ city: "", fuelType: "", minPrice: "", maxPrice: "", make: "" });

  const fetchListings = async (p = 1, f = filters) => {
    setLoading(true);
    try {
      const params = { page: p, limit: 9, ...Object.fromEntries(Object.entries(f).filter(([, v]) => v)) };
      const res = await getListings(params);
      setListings(res.data.data.listings);
      setTotal(res.data.data.total);
      setPage(res.data.data.page);
      setPages(res.data.data.pages);
    } catch { setListings([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchListings(); }, []);

  const applyFilters = () => { fetchListings(1, filters); setShowFilter(false); };
  const clearFilters = () => { const f = { city:"",fuelType:"",minPrice:"",maxPrice:"",make:"" }; setFilters(f); fetchListings(1, f); };
  const ff = (k) => ({ value: filters[k], onChange: (e) => setFilters({ ...filters, [k]: e.target.value }) });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Browse Cars</h1>
          <p className="text-gray-400 mt-1">{total} verified listings available</p>
        </div>
        <button onClick={() => setShowFilter(!showFilter)} className="btn-outline flex items-center gap-2 text-sm py-2 px-4">
          <FiFilter /> Filters
        </button>
      </div>

      {/* Filter panel */}
      {showFilter && (
        <div className="card mb-8 border-electric-500/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">City</label>
              <select className="input py-2" {...ff("city")}>
                <option value="">All Cities</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Fuel Type</label>
              <select className="input py-2" {...ff("fuelType")}>
                <option value="">All Fuels</option>
                {FUELS.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Make</label>
              <input className="input py-2" placeholder="e.g. Maruti" {...ff("make")} />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Min Price (₹)</label>
              <input className="input py-2" type="number" placeholder="e.g. 200000" {...ff("minPrice")} />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Max Price (₹)</label>
              <input className="input py-2" type="number" placeholder="e.g. 800000" {...ff("maxPrice")} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={applyFilters} className="btn-primary py-2 px-6 text-sm flex items-center gap-2"><FiSearch />Apply</button>
            <button onClick={clearFilters} className="btn-outline py-2 px-6 text-sm flex items-center gap-2"><FiX />Clear</button>
          </div>
        </div>
      )}

      {loading ? <Loader text="Loading listings..." /> : listings.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-6xl mb-4">🚗</div>
          <p className="text-lg">No listings found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((l) => <ListingCard key={l._id} listing={l} />)}
          </div>
          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => fetchListings(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${p === page ? "bg-electric-500 text-white" : "bg-navy-700 text-gray-400 hover:bg-navy-600"}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
