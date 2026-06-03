import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SearchVehicle from "./pages/SearchVehicle.jsx";
import VehicleReport from "./pages/VehicleReport.jsx";
import MaintenancePage from "./pages/MaintenancePage.jsx";
import Listings from "./pages/Listings.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CompareCars from "./pages/CompareCars.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminListings from "./pages/admin/AdminListings.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchVehicle />} />
          <Route path="/report/:rcNumber" element={<VehicleReport />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/create-listing" element={<ProtectedRoute roles={["seller", "admin"]}><CreateListing /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><CompareCars /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/listings" element={<ProtectedRoute roles={["admin"]}><AdminListings /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
