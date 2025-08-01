import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["announcement", "event", "notice"], default: "announcement" },
    createdBy: { type: String, default: "Admin" },
    scheduleDate: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);
