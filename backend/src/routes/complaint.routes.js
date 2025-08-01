import express from 'express';
import Complaint from '../models/Complaint.model.js';
import upload from '../middleware/uploadImage.js';
import verifyToken from '../middleware/verifyToken.js'; // ✅ Token validation
import { getMyComplaints } from '../controllers/complaint.controller.js';
import { getAllComplaints } from '../controllers/warden.controller.js';

const router = express.Router();

// ✅ POST Complaint with Image + Authentication
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { category, description } = req.body;

    const imageUrl = req.file ? req.file.path : ''; // Cloudinary URL

    const complaint = new Complaint({
      category,
      description,
      imageUrl,
      submittedBy: req.user._id // ✅ Comes from token
    });

    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    console.error('❌ Complaint Save Error:', err);
    res.status(400).json({ error: err.message });
  }
});
router.get('/my', verifyToken, getMyComplaints);
router.get('/all',verifyToken,getAllComplaints)

export default router;