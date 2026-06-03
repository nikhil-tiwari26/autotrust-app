import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById, deleteListing } from "../services/listingService.js";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/common/Loader.jsx";
import { formatPrice, formatKm, formatDate } from "../utils/formatters.js";
import { FiMapPin, FiDroplet, FiSettings, FiPhone, FiSearch, FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ListingDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    getListingById(id)
      .then((r) => setListing(r.data.data))
      .catch(() => navigate("/listings"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this listing?")) return;
    await deleteListing(id);
    navigate("/listings");
  };

  if (loading) return <Loader />;
  if (!listing) return null;

  const isOwner = user && (user._id === listing.seller?._id || user.role === "admin");
  const imgs = listing.images || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <button onClick={() => navigate("/listings")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm transition-colors">
        <FiChevronLeft /> Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="aspect-video bg-navy-700 rounded-2xl overflow-hidden relative">
            {imgs.length > 0 ? (
              <>
                <img src={imgs[imgIdx]} alt="" className="w-full h-full object-cover" />
                {imgs.length > 1 && (
                  <>
                    <button onClick={() => setImgIdx((i) => (i - 1 + imgs.length) % imgs.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"><FiChevronLeft /></button>
                    <button onClick={() => setImgIdx((i) => (i + 1) % imgs.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"><FiChevronRight /></button>
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{imgIdx + 1}/{imgs.length}</div>
                  </>
                )}
              </>
            ) : <div className="w-full h-full flex items-center justify-center text-6xl">🚗</div>}
          </div>
          {imgs.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {imgs.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? "border-electric-500" : "border-transparent"}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-white">{listing.title}</h1>
              {isOwner && (
                <button onClick={handleDelete} className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm border border-red-400/30 px-3 py-1.5 rounded-lg">
                  <FiTrash2 /> Delete
                </button>
              )}
            </div>
            <p className="text-3xl font-black text-electric-400 mt-2">{formatPrice(listing.price)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Year", listing.year], ["Odometer", formatKm(listing.km)],
              ["Fuel", listing.fuelType], ["Transmission", listing.transmission],
              ["Listed On", formatDate(listing.createdAt)], ["Views", listing.views],
            ].map(([k, v]) => (
              <div key={k} className="bg-navy-700 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-1">{k}</p>
                <p className="text-white font-medium">{v}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FiMapPin className="text-electric-400" />{listing.city}
          </div>

          {listing.description && (
            <div>
              <h3 className="text-white font-semibold mb-2">Description</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{listing.description}</p>
            </div>
          )}

          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <FiPhone className="text-electric-400" />
              <span>Contact Seller: <span className="text-white font-medium">{listing.contactPhone}</span></span>
            </div>
            {listing.rcNumber && (
              <button onClick={() => navigate(`/report/${listing.rcNumber}`)}
                className="btn-primary w-full flex items-center justify-center gap-2">
                <FiSearch /> Check This Vehicle's History
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
