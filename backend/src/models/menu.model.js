import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  weeklyMenu: {
    Monday: {
      breakfast: String,
      lunch: String,
      dinner: String
    },
    Tuesday: {
      breakfast: String,
      lunch: String,
      dinner: String
    },
    Wednesday: {
      breakfast: String,
      lunch: String,
      dinner: String
    },
    Thursday: {
      breakfast: String,
      lunch: String,
      dinner: String
    },
    Friday: {
      breakfast: String,
      lunch: String,
      dinner: String
    },
    Saturday: {
      breakfast: String,
      lunch: String,
      dinner: String
    },
    Sunday: {
      breakfast: String,
      lunch: String,
      dinner: String
    }
  }
});

export const Menu = mongoose.model("Menu", menuSchema);
