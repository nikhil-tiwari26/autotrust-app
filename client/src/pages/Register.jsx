import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { register as registerService } from "../services/authService.js";
import { FiShield, FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "buyer" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await registerService(form);
      login(res.data.data.user, res.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  const f = (field) => ({ value: form[field], onChange: (e) => setForm({ ...form, [field]: e.target.value }) });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <FiShield className="text-electric-500 text-4xl mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <p className="text-gray-400 mt-1">Join AutoTrust today — it's free</p>
        </div>
        <div className="card">
          {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
              <div className="relative"><FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="input pl-10" placeholder="Rahul Sharma" {...f("name")} required /></div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <div className="relative"><FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="input pl-10" type="email" placeholder="you@example.com" {...f("email")} required /></div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
              <div className="relative"><FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="input pl-10" placeholder="9876543210" {...f("phone")} /></div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <div className="relative"><FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="input pl-10" type="password" placeholder="Min 6 characters" {...f("password")} required /></div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">I want to</label>
              <select className="input" {...f("role")}>
                <option value="buyer">Buy a car (Buyer)</option>
                <option value="seller">Sell a car (Seller)</option>
              </select>
            </div>
            <button className="btn-primary w-full" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account? <Link to="/login" className="text-electric-400 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
