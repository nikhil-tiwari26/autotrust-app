import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../../services/adminService.js";
import Loader from "../../components/common/Loader.jsx";
import { FiUsers, FiList, FiClock, FiFileText } from "react-icons/fi";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats().then((r) => setStats(r.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: <FiUsers />, color: "text-blue-400", bg: "bg-blue-500/10", link: "/admin/users" },
    { label: "Total Listings", value: stats.totalListings, icon: <FiList />, color: "text-green-400", bg: "bg-green-500/10", link: "/admin/listings" },
    { label: "Pending Approval", value: stats.pendingListings, icon: <FiClock />, color: "text-yellow-400", bg: "bg-yellow-500/10", link: "/admin/listings" },
    { label: "Vehicle Reports", value: stats.totalReports, icon: <FiFileText />, color: "text-purple-400", bg: "bg-purple-500/10", link: "#" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Panel</h1>
        <p className="text-gray-400 mt-1">Manage users, listings and reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((c) => (
          <Link to={c.link} key={c.label} className="card hover:border-white/20 transition-all">
            <div className={`${c.bg} w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${c.color} text-xl`}>{c.icon}</div>
            <p className="text-3xl font-black text-white">{c.value}</p>
            <p className="text-gray-400 text-sm mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/users" className="card hover:border-electric-500/40 transition-all flex items-center gap-4">
          <div className="bg-electric-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-electric-400 text-xl"><FiUsers /></div>
          <div><p className="text-white font-semibold">Manage Users</p><p className="text-gray-400 text-sm">View, activate, deactivate or delete users</p></div>
        </Link>
        <Link to="/admin/listings" className="card hover:border-electric-500/40 transition-all flex items-center gap-4">
          <div className="bg-electric-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-electric-400 text-xl"><FiList /></div>
          <div><p className="text-white font-semibold">Manage Listings</p><p className="text-gray-400 text-sm">Approve or reject car listings from sellers</p></div>
        </Link>
      </div>
    </div>
  );
}
