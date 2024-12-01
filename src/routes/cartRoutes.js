// src/routes/cartRoutes.js
import express from "express";
import { addItemToCart, getCart } from "../controllers/cartController.js";

const router = express.Router();

// Route to add an item to the cart
router.post("/add", addItemToCart);

// Route to get the current user's cart
router.get("/", getCart);

export default router;
