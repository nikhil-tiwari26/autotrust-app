import { Link } from "react-router-dom";
import { FiMapPin, FiDroplet, FiSettings } from "react-icons/fi";
import { formatPrice, formatKm } from "../../utils/formatters.js";

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing._id}`} className="card hover:border-electric-500/50 transition-all duration-200 group block">
      <div className="aspect-video bg-navy-700 rounded-xl mb-4 overflow-hidden">
        {listing.images?.[0] ? (
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">🚗</div>
        )}
      </div>
      <div className="space-y-3">
        <div>
          <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-electric-400 transition-colors">{listing.title}</h3>
          <p className="text-electric-400 text-xl font-bold mt-1">{formatPrice(listing.price)}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1"><FiMapPin className="text-xs" />{listing.city}</span>
          <span className="flex items-center gap-1"><FiDroplet className="text-xs" />{listing.fuelType}</span>
          <span className="flex items-center gap-1"><FiSettings className="text-xs" />{listing.transmission}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{listing.year}</span>
          <span>{formatKm(listing.km)}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${listing.status === "approved" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{listing.status}</span>
        </div>
      </div>
    </Link>
  );
}
