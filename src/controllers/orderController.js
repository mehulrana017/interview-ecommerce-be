import { discountCodes, orders } from "../../src/datasets/data.js";
import { nthOrder } from "../constants/index.js";

export const placeOrder = (req, res) => {
  const { order } = req.body;

  // Check if the order has a discount code and validate it
  if (order.discountCode) {
    if (
      orders.length % nthOrder === 0 &&
      !discountCodes.includes(order.discountCode)
    ) {
      return res.json({ message: "Invalid Discount code." });
    }
  }

  // Place the order
  orders.push(order);
  res.json({ message: "Order placed successfully" });
};
