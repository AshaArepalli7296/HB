import express from 'express';
import { createComplaint, getMyComplaints } from '../controllers/complaint.controller.js';
import { protect, restrictTo } from '../middleware/auth.js';
import upload from '../middleware/uploadImage.js';

const router = express.Router();

// Student Routes
router
  .route('/')
  .post(protect, restrictTo('student'), upload.single('photo'), createComplaint)
  .get(protect, restrictTo('student'), getMyComplaints);

export default router;
