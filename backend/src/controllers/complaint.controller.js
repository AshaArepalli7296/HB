import Complaint from '../models/Complaint.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';

export const createComplaint = asyncHandler(async (req, res, next) => {
  const { category, description } = req.body;

  if (!req.user || !req.user._id) {
    return next(new AppError('Unauthorized: Missing user info', 401));
  }

  if (!category || !description) {
    return next(new AppError('Category and description are required', 400));
  }

  // 📷 Multer + Cloudinary already uploaded the image, path holds the URL
  const imageUrl = req.file?.path || ''; 

  const complaint = await Complaint.create({
    submittedBy: req.user._id,
    category,
    description,
    imageUrl,
    status: 'Pending'
  });

  res.status(201).json({
    status: 'success',
    message: 'Complaint submitted successfully',
    data: complaint
  });
});

export const getMyComplaints = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return next(new AppError('Unauthorized: Missing user info', 401));
  }

  const complaints = await Complaint.find({ submittedBy: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: complaints.length,
    data: complaints
  });
});
