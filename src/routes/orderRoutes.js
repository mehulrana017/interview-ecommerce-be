// src/routes/orderRoutes.js
import express from "express";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

// Route to place an order
router.post("/place", placeOrder);

// Route to get the order summary (could include the applied discount)
// router.get("/summary", getOrderSummary);

export default router;
