//adminController.js
import { nthOrder } from "../constants/index.js";
import { discountCodes, orders } from "../datasets/data.js";

const discountPercentage = 10;

export const generateDiscountCode = (req, res) => {
  if (orders.length % nthOrder !== 0 || orders.length === 0) {
    return res.status(200).json({
      message: `You can only request discount code for every ${nthOrder} order`,
      success: false,
    });
  } else {
    const discountCodeData = {
      discountCode: `DISCOUNTCODE${orders.length + 1}`,
      discountPercentage: discountPercentage,
    };

    discountCodes.push(discountCodeData);

    return res.status(200).json({
      message: "Discount code generated",
      discountCodeData: discountCodeData,
      success: true,
    });
  }
};

export const getOrderSummary = (req, res) => {
  try {
    console.log("orders", orders);
    if (!orders.length) {
      return res.status(200).json({
        message: "No orders have been placed yet.",
        success: true,
        data: {
          totalItems: 0,
          totalPurchaseAmount: 0,
          discountCodesUsed: [],
          totalDiscountAmount: 0,
        },
      });
    }
    // Aggregate data from orders
    let totalItems = 0;
    let totalPurchaseAmount = 0;
    let totalDiscountAmount = 0;
    const discountCodesUsed = new Set(); // Use a Set to store unique discount codes

    orders.forEach((order) => {
      totalItems += order.items.reduce((sum, item) => sum + item.quantity, 0);
      totalPurchaseAmount += order.subtotal;
      totalDiscountAmount += order.discountedAmount;

      if (order.discountCode) {
        discountCodesUsed.add(order.discountCode);
      }
    });

    return res.status(200).json({
      message: "Purchase summary retrieved successfully.",
      success: true,
      data: {
        totalItems,
        totalPurchaseAmount,
        discountCodesUsed: Array.from(discountCodesUsed),
        totalDiscountAmount,
      },
    });
  } catch (error) {
    console.error("Error generating purchase summary:", error);
    return res.status(500).json({
      message: "An error occurred while generating the purchase summary.",
      success: false,
    });
  }
};
