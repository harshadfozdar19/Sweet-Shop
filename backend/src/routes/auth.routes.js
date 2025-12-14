const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  registerValidation,
  loginValidation,
} = require("../validators/auth.validator");

// register route
router.post(
  "/register",
  registerValidation,
  validate,
  authController.register
);

// login route
router.post(
  "/login",
  loginValidation,
  validate,
  authController.login
);

// verify logged-in user
router.get(
  "/me",
  auth,
  authController.getMe
);

module.exports = router;
