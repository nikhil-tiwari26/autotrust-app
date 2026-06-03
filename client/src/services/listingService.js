import api from "./api.js";
export const getListings = (params) => api.get("/listings", { params });
export const getListingById = (id) => api.get(`/listings/${id}`);
export const createListing = (formData) => api.post("/listings/create", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateListing = (id, data) => api.put(`/listings/${id}`, data);
export const deleteListing = (id) => api.delete(`/listings/${id}`);
export const getMyListings = () => api.get("/listings/my");
