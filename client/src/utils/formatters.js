export const formatPrice = (p) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A";
export const formatKm = (km) => new Intl.NumberFormat("en-IN").format(km) + " km";
export const getRiskColor = (s) => s <= 30 ? "text-green-400" : s <= 60 ? "text-yellow-400" : "text-red-400";
export const getRiskLabel = (s) => s <= 30 ? "Safe Buy" : s <= 60 ? "Proceed with Caution" : s <= 80 ? "High Risk" : "Avoid";
