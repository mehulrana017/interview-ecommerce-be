import request from "supertest";
import app from "../src/app.js";
import { orders, discountCodes } from "../src/datasets/data.js";
import { nthOrder } from "../src/constants/index.js";

describe("Admin Routes", () => {
  beforeEach(() => {
    // Clear and populate mock data before each test
    orders.length = 0; // Clear the orders array
    discountCodes.length = 0; // Clear discount codes
    // Add mock orders to simulate the nth-order scenario
    orders.push({
      id: "mock-id-1",
      items: [{ name: "Item 1", quantity: 2, price: 100 }],
      subtotal: 200,
      discountedAmount: 20,
      discountCode: null,
      date: new Date(),
    });
  });

  it("should not generate a discount code when the nth-order condition is not met", async () => {
    const response = await request(app).get("/api/admin/generate-discount");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(
      `You can only request discount code for every ${nthOrder} order`
    );
  });

  it("should generate a discount code for every nth order", async () => {
    for (let i = 0; i < nthOrder - 1; i++) {
      orders.push({
        id: `mock-id-${i + 2}`,
        items: [{ name: "Item 1", quantity: 1, price: 100 }],
        subtotal: 100,
        discountedAmount: 10,
        discountCode: null,
        date: new Date(),
      });
    }

    const response = await request(app).get("/api/admin/generate-discount");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.discountCodeData).toBeDefined();
    expect(response.body.discountCodeData.discountPercentage).toBe(10);
  });

  it("should return a purchase summary", async () => {
    const response = await request(app).get("/api/admin/summary");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("totalItems", 2);
    expect(response.body.data).toHaveProperty("totalPurchaseAmount", 200);
    expect(response.body.data).toHaveProperty("totalDiscountAmount", 20);
    expect(response.body.data.discountCodesUsed).toEqual([]);
  });
});
