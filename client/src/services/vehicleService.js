import api from "./api.js";
export const lookupVehicle = (rc) => api.get(`/vehicle/${rc}`);
export const getRiskScore = (rcNumber) => api.post("/ai/risk-score", { rcNumber });
export const getMaintenanceCost = (data) => api.post("/ai/maintenance", data);
export const saveReport = (vehicleId) => api.post("/vehicle/save", { vehicleId });
export const getSavedReports = () => api.get("/vehicle/saved/all");
export const removeReport = (vehicleId) => api.delete(`/vehicle/saved/${vehicleId}`);
