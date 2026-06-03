import { Link } from "react-router-dom";
import { FiShield } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-navy-800 border-t border-white/10 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold mb-3">
              <FiShield className="text-electric-500" />
              <span>Auto<span className="text-electric-400">Trust</span></span>
            </div>
            <p className="text-gray-400 text-sm">India's AI-powered used car verification platform. Buy with confidence.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <Link to="/search" className="block hover:text-white">Check Vehicle</Link>
              <Link to="/maintenance" className="block hover:text-white">Cost Estimator</Link>
              <Link to="/listings" className="block hover:text-white">Browse Cars</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Account</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <Link to="/login" className="block hover:text-white">Login</Link>
              <Link to="/register" className="block hover:text-white">Register</Link>
              <Link to="/dashboard" className="block hover:text-white">Dashboard</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AutoTrust. Built with ❤️ for Indian car buyers.
        </div>
      </div>
    </footer>
  );
}
