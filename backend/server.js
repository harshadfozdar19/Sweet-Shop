const app = require("./src/app");
const connectDB = require("./src/database");
const createMasterAdmin = require("./src/seed/createAdmin"); // <-- add this
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// connect to db and then initialize admin
connectDB().then(() => {
  createMasterAdmin(); // <-- run admin seeder once DB is ready
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
