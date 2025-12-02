import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Storage settings for cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "code-journey", // folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export const upload = multer({ storage });
