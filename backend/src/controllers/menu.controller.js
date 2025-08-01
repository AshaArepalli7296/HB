import { Menu } from "../models/menu.model.js";

// Fetch menu (if not exist, create default)
export const getMenu = async (req, res) => {
  try {
    let menu = await Menu.findOne();

    if (!menu) {
      // Create a default menu if DB is empty
      menu = await Menu.create({
        weeklyMenu: {
          Monday: { breakfast: "Idli", lunch: "Rice & Dal", dinner: "Dosa" },
          Tuesday: { breakfast: "Paratha", lunch: "Pulao", dinner: "Chapati" },
          Wednesday: { breakfast: "Upma", lunch: "Rice", dinner: "Veg Curry" },
          Thursday: { breakfast: "Maggi", lunch: "Veg Biryani", dinner: "Pasta" },
          Friday: { breakfast: "Aloo Puri", lunch: "Dal Makhani", dinner: "Onion Dosa" },
          Saturday: { breakfast: "Bread Butter", lunch: "Curd Rice", dinner: "Maggi" },
          Sunday: { breakfast: "Poori", lunch: "Paneer Rice", dinner: "Chole" }
        }
      });
    }

    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific day's menu
export const updateMenuForDay = async (req, res) => {
  try {
    const { day } = req.params;
    const { breakfast, lunch, dinner } = req.body;

    let menu = await Menu.findOne();
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // Update only that day's menu
    menu.weeklyMenu[day] = { breakfast, lunch, dinner };
    await menu.save();

    res.json({ message: `Menu updated for ${day}`, menu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
