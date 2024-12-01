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
