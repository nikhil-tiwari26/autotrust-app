import { useEffect, useState } from "react";
import { getAllListings, approveListing, rejectListing } from "../../services/adminService.js";
import Loader from "../../components/common/Loader.jsx";
import { formatPrice, formatDate } from "../../utils/formatters.js";
import { FiCheck, FiX, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    getAllListings().then((r) => setListings(r.data.data)).finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    await approveListing(id);
    setListings((prev) => prev.map((l) => l._id === id ? { ...l, status: "approved" } : l));
  };

  const handleReject = async (id) => {
    await rejectListing(id);
    setListings((prev) => prev.map((l) => l._id === id ? { ...l, status: "rejected" } : l));
  };

  const filtered = filter === "all" ? listings : listings.filter((l) => l.status === filter);

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin" className="text-gray-400 hover:text-white"><FiArrowLeft className="text-xl" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-white">All Listings</h1>
          <p className="text-gray-400 text-sm">{listings.filter((l) => l.status === "pending").length} pending review</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-navy-800 rounded-xl p-1 mb-6 w-fit">
        {["pending", "approved", "rejected", "all"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === s ? "bg-electric-500 text-white" : "text-gray-400 hover:text-white"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card text-center py-12 text-gray-500">No listings in this category.</div>
        ) : filtered.map((l) => (
          <div key={l._id} className="card flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {l.images?.[0] && <img src={l.images[0]} alt="" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
              <div>
                <p className="text-white font-semibold">{l.title}</p>
                <p className="text-electric-400 font-bold text-sm">{formatPrice(l.price)}</p>
                <p className="text-gray-400 text-xs mt-0.5">by {l.seller?.name} · {formatDate(l.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${l.status === "approved" ? "bg-green-500/20 text-green-400" : l.status === "rejected" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                {l.status}
              </span>
              {l.status === "pending" && (
                <>
                  <button onClick={() => handleApprove(l._id)} className="flex items-center gap-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5 rounded-lg text-sm">
                    <FiCheck /> Approve
                  </button>
                  <button onClick={() => handleReject(l._id)} className="flex items-center gap-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded-lg text-sm">
                    <FiX /> Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
