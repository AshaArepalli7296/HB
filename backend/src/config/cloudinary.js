// src/config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config(); // ✅ Load environment variables from .env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Add storage config for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hostel-applications',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
  },
});

export { cloudinary, storage }; // ✅ export both