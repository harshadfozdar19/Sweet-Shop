
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");
const bcrypt = require("bcryptjs");

let adminToken;
let userToken;
let sweetId;

beforeAll(async () => {
  // create admin
  const adminEmail = `admin${Date.now()}@test.com`;
  const adminPassword = "Admin@12345";

  const hashedAdminPwd = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Test Admin",
    email: adminEmail,
    password: hashedAdminPwd,
    role: "admin",
  });

  const adminRes = await request(app)
    .post("/api/auth/login")
    .send({ email: adminEmail, password: adminPassword });

  adminToken = adminRes.body.token;

  // create normal user
  const userEmail = `user${Date.now()}@test.com`;
  const userPassword = "User@12345";

  const hashedUserPwd = await bcrypt.hash(userPassword, 10);

  await User.create({
    name: "Test User",
    email: userEmail,
    password: hashedUserPwd,
    role: "user",
  });

  const userRes = await request(app)
    .post("/api/auth/login")
    .send({ email: userEmail, password: userPassword });

  userToken = userRes.body.token;
});

// afterAll(async () => {
//   await Sweet.deleteMany({});
//   await User.deleteMany({});
//   await mongoose.connection.close(); // ✅ VERY IMPORTANT
// });


// 1️⃣ Admin can create a sweet
test("Admin can create a sweet", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Test Sweet",
      category: "Test",
      price: 200,
      quantity: 5,
      image: "https://example.com/sweet.jpg",
    });

  expect(res.statusCode).toBe(201);
  sweetId = res.body.sweet._id;
});


// 2️⃣ User cannot create a sweet
test("User cannot create a sweet", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${userToken}`)
    .send({
      name: "Invalid Sweet",
      category: "Test",
      price: 100,
      quantity: 2,
      image: "https://example.com/x.jpg",
    });

  expect(res.statusCode).toBe(403);
});


// 3️⃣ Get all sweets
test("Anyone can fetch sweets", async () => {
  const res = await request(app).get("/api/sweets");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body.sweets)).toBe(true);
});


// 4️⃣ Admin can update a sweet
test("Admin can update sweet price", async () => {
  const res = await request(app)
    .put(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ price: 250 });

  expect(res.statusCode).toBe(200);
  expect(res.body.sweet.price).toBe(250);
});


// 5️⃣ User cannot update a sweet
test("User cannot update sweet", async () => {
  const res = await request(app)
    .put(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ price: 300 });

  expect(res.statusCode).toBe(403);
});


// 6️⃣ User can purchase a sweet
test("User can purchase sweet", async () => {
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ amount: 1 });

  expect(res.statusCode).toBe(200);
  expect(res.body.sweet.quantity).toBe(4);
});


// 7️⃣ Purchase fails when stock insufficient
test("Purchase fails if stock insufficient", async () => {
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ amount: 10 });

  expect(res.statusCode).toBe(400);
});


// 8️⃣ Admin can restock a sweet
test("Admin can restock sweet", async () => {
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ amount: 5 });

  expect(res.statusCode).toBe(200);
  expect(res.body.sweet.quantity).toBeGreaterThan(4);
});


// 9️⃣ User cannot restock
test("User cannot restock sweet", async () => {
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ amount: 5 });

  expect(res.statusCode).toBe(403);
});


// 🔟 Admin can delete sweet
test("Admin can delete sweet", async () => {
  const res = await request(app)
    .delete(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});


// 1️⃣1️⃣ Cannot purchase deleted sweet
test("Cannot purchase deleted sweet", async () => {
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ amount: 1 });

  expect(res.statusCode).toBe(404);
});
