const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

let adminToken;

beforeAll(async () => {
  const adminEmail = `admin${Date.now()}@test.com`;
  const adminPassword = "Admin@12345";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Test Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  const res = await request(app).post("/api/auth/login").send({
    email: adminEmail,
    password: adminPassword,
  });

  adminToken = res.body.token;
});



test("Admin can create a sweet", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: `Test Sweet ${Date.now()}`,
      category: "Test",
      price: 10,
      quantity: 5,
    });

  expect(res.statusCode).toBe(201);
});
