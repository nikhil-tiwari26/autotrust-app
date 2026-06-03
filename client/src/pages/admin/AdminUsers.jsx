import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, toggleUserStatus } from "../../services/adminService.js";
import Loader from "../../components/common/Loader.jsx";
import { formatDate } from "../../utils/formatters.js";
import { FiTrash2, FiToggleLeft, FiToggleRight, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((r) => setUsers(r.data.data)).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const handleToggle = async (id) => {
    const res = await toggleUserStatus(id);
    setUsers((prev) => prev.map((u) => u._id === id ? { ...u, isActive: res.data.data.isActive } : u));
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin" className="text-gray-400 hover:text-white"><FiArrowLeft className="text-xl" /></Link>
        <div>
          <h1 className="text-2xl font-bold text-white">All Users</h1>
          <p className="text-gray-400 text-sm">{users.length} users registered</p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-left">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Email</th>
              <th className="pb-3 pr-4">Role</th>
              <th className="pb-3 pr-4">Joined</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-white/5 hover:bg-white/2">
                <td className="py-3 pr-4 text-white font-medium">{u.name}</td>
                <td className="py-3 pr-4 text-gray-300">{u.email}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === "seller" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>{u.role}</span>
                </td>
                <td className="py-3 pr-4 text-gray-400">{formatDate(u.createdAt)}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleToggle(u._id)} className={`${u.isActive ? "text-yellow-400" : "text-green-400"} hover:opacity-70 text-xl`}>
                      {u.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                    </button>
                    <button onClick={() => handleDelete(u._id)} className="text-red-400 hover:text-red-300"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
