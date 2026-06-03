import api from "./api.js";
export const getStats = () => api.get("/admin/stats");
export const getAllUsers = () => api.get("/admin/users");
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const toggleUserStatus = (id) => api.put(`/admin/users/${id}/toggle`);
export const getAllListings = () => api.get("/admin/listings");
export const approveListing = (id) => api.put(`/admin/listings/${id}/approve`);
export const rejectListing = (id) => api.put(`/admin/listings/${id}/reject`);
