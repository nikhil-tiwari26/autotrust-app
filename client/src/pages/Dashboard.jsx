import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getSavedReports, removeReport } from "../services/vehicleService.js";
import { getMyListings } from "../services/listingService.js";
import Loader from "../components/common/Loader.jsx";
import { formatDate, formatPrice } from "../utils/formatters.js";
import { FiTrash2, FiSearch, FiBarChart2, FiList, FiBookmark } from "react-icons/fi";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("reports");

  useEffect(() => {
    const load = async () => {
      try {
        const [r, l] = await Promise.all([getSavedReports(), getMyListings()]);
        setReports(r.data.data || []);
        setListings(l.data.data || []);
      } catch { }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const handleRemove = async (vehicleId) => {
    await removeReport(vehicleId);
    setReports((prev) => prev.filter((r) => r._id !== vehicleId));
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user?.name}</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link to="/search" className="btn-outline flex items-center gap-2 text-sm py-2 px-4"><FiSearch />Check Vehicle</Link>
          {reports.length >= 2 && (
            <Link to="/compare" className="btn-primary flex items-center gap-2 text-sm py-2 px-4"><FiBarChart2 />Compare Cars</Link>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-navy-800 rounded-xl p-1 mb-6 w-fit">
        {[["reports", FiBookmark, "Saved Reports"], ["listings", FiList, "My Listings"]].map(([key, Icon, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === key ? "bg-electric-500 text-white" : "text-gray-400 hover:text-white"}`}>
            <Icon className="text-xs" />{label}
          </button>
        ))}
      </div>

      {/* Saved Reports Tab */}
      {tab === "reports" && (
        reports.length === 0 ? (
          <div className="card text-center py-16">
            <FiBookmark className="text-5xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No saved reports yet.</p>
            <Link to="/search" className="btn-primary inline-flex items-center gap-2"><FiSearch />Check a Vehicle</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((v) => (
              <div key={v._id} className="card flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold">{v.make} {v.model}</p>
                  <p className="text-electric-400 font-mono text-sm">{v.rcNumber}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-400">
                    <span>Owners: {v.ownerCount}</span>
                    <span>Insurance: {v.insuranceActive ? "✅ Active" : "❌ Expired"}</span>
                    {v.aiRiskScore !== null && (
                      <span className={v.aiRiskScore <= 30 ? "text-green-400" : v.aiRiskScore <= 60 ? "text-yellow-400" : "text-red-400"}>
                        Risk: {v.aiRiskScore}/100
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => navigate(`/report/${v.rcNumber}`)} className="btn-outline text-sm py-2 px-4">View Report</button>
                  <button onClick={() => handleRemove(v._id)} className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm border border-red-400/20 px-3 py-2 rounded-lg">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* My Listings Tab */}
      {tab === "listings" && (
        listings.length === 0 ? (
          <div className="card text-center py-16">
            <FiList className="text-5xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">You haven't posted any listings yet.</p>
            {user?.role === "seller" && (
              <Link to="/create-listing" className="btn-primary inline-flex gap-2">Post a Car</Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((l) => (
              <div key={l._id} className="card flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {l.images?.[0] && <img src={l.images[0]} alt="" className="w-16 h-12 object-cover rounded-lg" />}
                  <div>
                    <p className="text-white font-semibold">{l.title}</p>
                    <p className="text-electric-400 font-bold">{formatPrice(l.price)}</p>
                    <p className="text-xs text-gray-400 mt-1">Listed {formatDate(l.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${l.status === "approved" ? "bg-green-500/20 text-green-400" : l.status === "rejected" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {l.status}
                  </span>
                  <Link to={`/listings/${l._id}`} className="btn-outline text-sm py-1.5 px-3">View</Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
