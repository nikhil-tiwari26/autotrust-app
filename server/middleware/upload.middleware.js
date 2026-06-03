import { upload } from "../config/cloudinary.js";
export const uploadImages = upload.array("images", 6);
