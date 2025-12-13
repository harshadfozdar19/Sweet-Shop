module.exports = {
  testEnvironment: "node",
  testMatch: ["**/src/tests/**/*.test.js"],
  testTimeout: 20000, // 20 seconds
   setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"]
};
