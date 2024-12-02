//orderController.js
import { cart, discountCodes, orders } from "../../src/datasets/data.js";
import { v4 as uuidv4 } from "uuid";

export const placeOrder = (req, res) => {
  const { items, subtotal, discountedAmount, discountCode } = req.body;

  if (discountCode) {
    // Check if the discount code exists in the discountCodes array
    const isValidDiscountCode = discountCodes.some(
      (code) => code.discountCode === discountCode
    );

    if (!isValidDiscountCode) {
      return res.json({ message: "Invalid Discount code." });
    }
  }

  const newOrder = {
    id: uuidv4(), // Implement a unique ID generator
    items,
    subtotal,
    discountedAmount,
    discountCode,
    date: new Date(),
  };

  // Place the order
  orders.push(newOrder);
  cart.length = 0;
  console.log("orders", orders);
  res.status(201).json({ message: "Order placed successfully" });
};
