const app = require("./src/app");
const connectDB = require("./src/database");
const createMasterAdmin = require("./src/seed/createAdmin"); // <-- add this
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// connect to DB only if not testing
if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => createMasterAdmin());

  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}

module.exports = app; // export for tests