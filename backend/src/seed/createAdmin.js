const User = require("../models/User");
const bcrypt = require("bcryptjs");

// runs once on server start
const createMasterAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // safety check
  if (!adminEmail || !adminPassword) {
    console.warn("⚠️ Admin credentials not set in environment variables");
    return;
  }

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    console.log("✔ Admin already exists:", adminEmail);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log("🎉 Master Admin Created Automatically!");
};

module.exports = createMasterAdmin;
