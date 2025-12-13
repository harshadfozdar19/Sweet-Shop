const express = require("express");
const router = express.Router();
const sweetController = require("../controllers/sweet.controller");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/role.middleware");

const validate = require("../middleware/validate.middleware");
const {
  createSweetValidation,
  updateSweetValidation
} = require("../validators/sweet.validator");

// protected routes
router.post("/", auth, isAdmin, createSweetValidation, validate, sweetController.createSweet);
router.get("/", auth, sweetController.getAllSweets);
router.get("/search", auth, sweetController.searchSweets);

// admin only updates
router.put("/:id", auth, isAdmin, updateSweetValidation, validate, sweetController.updateSweet);
router.delete("/:id", auth, isAdmin, sweetController.deleteSweet);

// inventory
router.post("/:id/purchase", auth, sweetController.purchaseSweet);
router.post("/:id/restock", auth, isAdmin, sweetController.restockSweet);

module.exports = router;
