import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import RoomApplication from '../models/roomApplicationModel.js';

const router = express.Router();
const upload = multer({ storage });

// Use upload.fields to accept multiple file fields
router.post(
  '/',
  upload.fields([
    { name: 'studentPhoto', maxCount: 1 },
    { name: 'aadhaar', maxCount: 1 },
    { name: 'collegeId', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { fullName, rollNumber, branchYear, gender, phone, parentPhone, address, medicalInfo, sharingType, acType } = req.body;

      const studentPhoto = req.files?.studentPhoto?.[0]?.path || '';
      const aadhaar = req.files?.aadhaar?.[0]?.path || '';
      const collegeId = req.files?.collegeId?.[0]?.path || '';

      const newApplication = new RoomApplication({
        fullName,
        rollNumber,
        branchYear,
        gender,
        phone,
        parentPhone,
        address,
        medicalInfo,
        sharingType,
        acType,
        studentPhoto,
        aadhaar,
        collegeId,
      });

      await newApplication.save();
      res.status(201).json({ success: true, message: 'Application submitted with files!' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);
export default router;
