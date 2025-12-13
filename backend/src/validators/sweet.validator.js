const { body } = require("express-validator");

exports.createSweetValidation = [
  body("name").notEmpty().withMessage("Sweet name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be >= 0"),
  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be >= 0"),
];

exports.updateSweetValidation = [
  body("price").optional().isFloat({ min: 0 }),
  body("quantity").optional().isInt({ min: 0 }),
];
