import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { FiMenu, FiX, FiShield, FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); setOpen(false); };

  const navLinks = [
    { to: "/search", label: "Check Vehicle" },
    { to: "/maintenance", label: "Cost Estimator" },
    { to: "/listings", label: "Browse Cars" },
  ];

  return (
    <nav className="bg-navy-800 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <FiShield className="text-electric-500 text-2xl" />
            <span>Auto<span className="text-electric-400">Trust</span></span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link to="/admin" className="text-sm text-electric-400 hover:text-electric-300 font-medium">Admin</Link>
                )}
                <Link to="/dashboard" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                  <FiUser /> {user.name}
                </Link>
                {user.role === "seller" && (
                  <Link to="/create-listing" className="btn-outline text-sm py-2 px-4">Post Car</Link>
                )}
                <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors">
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-300 hover:text-white font-medium">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-300 hover:text-white text-2xl">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-800 border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-gray-300 hover:text-white py-2">{l.label}</Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block text-gray-300 hover:text-white py-2">Dashboard</Link>
              {user.role === "admin" && <Link to="/admin" onClick={() => setOpen(false)} className="block text-electric-400 py-2">Admin Panel</Link>}
              {user.role === "seller" && <Link to="/create-listing" onClick={() => setOpen(false)} className="block text-electric-400 py-2">Post Car</Link>}
              <button onClick={handleLogout} className="block text-red-400 py-2 w-full text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block text-gray-300 py-2">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="block btn-primary text-center mt-2">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
