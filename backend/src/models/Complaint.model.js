import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Electrical', 'Plumbing', 'Furniture', 'Cleaning', 'Other'],
    required: [true, 'Complaint category is required']
  },
  description: {
    type: String,
    required: [true, 'Please provide a complaint description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Complaint', complaintSchema);
