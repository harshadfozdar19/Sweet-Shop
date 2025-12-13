const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  const email = `test${Date.now()}@test.com`;

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email,
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        password: "password123",
      });

    expect(res.body.token).toBeDefined();
  });
});
