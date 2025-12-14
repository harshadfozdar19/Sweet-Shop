const request = require("supertest");
const app = require("../app");

test("Purchase fails if quantity insufficient", async () => {
  const res = await request(app)
    .post("/api/sweets/invalid-id/purchase")
    .set("Authorization", "Bearer invalid");

    
  expect(res.statusCode).toBe(401);
});
