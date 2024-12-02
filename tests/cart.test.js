import request from "supertest";
import app from "../src/app";

describe("Cart Routes", () => {
  it("should add an item to the cart", async () => {
    const newItem = { id: 1, name: "Test Item", price: 100, quantity: 2 };
    const response = await request(app).post("/api/cart/add").send(newItem);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.cart).toContainEqual(newItem);
  });

  it("should get the cart contents", async () => {
    const response = await request(app).get("/api/cart");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
