import express from "express";
import { getMenu, updateMenuForDay } from "../controllers/menu.controller.js";

const router = express.Router();

// GET all weekly menu
router.get("/", getMenu);

// PUT update specific day menu
router.put("/:day", updateMenuForDay);

export default router;
