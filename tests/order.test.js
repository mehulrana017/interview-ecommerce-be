import request from "supertest";
import app from "../src/app";

describe("Order Routes", () => {
  it("should place an order", async () => {
    const orderData = {
      items: [{ id: 1, name: "Test Item", price: 100, quantity: 2 }],
      subtotal: 200,
      discountedAmount: 20,
      discountCode: null,
    };

    const response = await request(app)
      .post("/api/order/place")
      .send(orderData);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Order placed successfully");
  });

  it("should reject invalid discount codes", async () => {
    const orderData = {
      items: [{ id: 1, name: "Test Item", price: 100, quantity: 2 }],
      subtotal: 200,
      discountedAmount: 20,
      discountCode: "INVALIDCODE",
    };

    const response = await request(app)
      .post("/api/order/place")
      .send(orderData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Invalid Discount code.");
  });
});
