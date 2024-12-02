// src/routes/adminRoutes.js
import express from "express";
import {
  generateDiscountCode,
  getOrderSummary,
} from "../controllers/adminController.js";

const router = express.Router();

// Route to generate discount code for every nth order
router.get("/generate-discount", generateDiscountCode);

// Route to get the purchase summary (items purchased, total purchase amount, discount codes, etc.)
router.get("/summary", getOrderSummary);

export default router;
