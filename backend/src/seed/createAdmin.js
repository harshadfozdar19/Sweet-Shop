const User = require("../models/User");
const bcrypt = require("bcryptjs");

// this will run only once when the server starts
const createMasterAdmin = async () => {
  const adminEmail = "admin@sweetshop.com";

  // check if admin already exists
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log("✔ Admin already exists:", adminEmail);
    return;
  }

  // create admin with default secure password
  const hashedPassword = await bcrypt.hash("Admin@12345", 10);

  await User.create({
    name: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin"
  });



  console.log("🎉 Master Admin Created Automatically!");
  console.log("   Email:", adminEmail);
  console.log("   Password: Admin@12345");
};

module.exports = createMasterAdmin;
