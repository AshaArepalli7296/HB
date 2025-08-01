import express from "express";
import Announcement from "../models/Announcement.model.js";

const router = express.Router();

// ✅ Get all announcements (latest first)
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

// ✅ Create new announcement
router.post("/", async (req, res) => {
  try {
    const { title, message, type, createdBy } = req.body;
    const newAnnouncement = new Announcement({ title, message, type, createdBy });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
});

// ✅ Update announcement
router.put("/:id", async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: "Failed to update announcement" })
  }
})

// ✅ Delete announcement
router.delete("/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id)
    res.json({ message: "Announcement deleted" })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete announcement" })
  }
})


export default router;
