const sweetService = require("../services/sweet.service");

// create sweet (admin)
const createSweet = async (req, res) => {
  try {
    const sweet = await sweetService.createSweet(req.body);
    return res.status(201).json({
      message: "Sweet added",
      sweet,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get all sweets
const getAllSweets = async (req, res) => {
  try {
    const sweets = await sweetService.getAllSweets();
    return res.status(200).json({ sweets });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// search sweets
const searchSweets = async (req, res) => {
  try {
    const sweets = await sweetService.searchSweets(req.query);
    return res.status(200).json({ sweets });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update sweet (admin)
const updateSweet = async (req, res) => {
  try {
    const sweet = await sweetService.updateSweet(req.params.id, req.body);
    return res.status(200).json({
      message: "Sweet updated",
      sweet,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// delete sweet (admin)
const deleteSweet = async (req, res) => {
  try {
    await sweetService.deleteSweet(req.params.id);
    return res.status(200).json({ message: "Sweet deleted" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// purchase sweet (user/admin)
// default purchase = 1 item
const purchaseSweet = async (req, res) => {
  try {
    const amount = Number(req.body?.amount) || 1; // 👈 safe access

    const sweet = await sweetService.purchaseSweet(
      req.params.id,
      amount
    );

    return res.status(200).json({
      message: "Purchase successful",
      sweet,
    });
  } catch (err) {
    console.error("PURCHASE ERROR:", err.message);
    return res.status(400).json({ error: err.message });
  }
};


// restock sweet (admin)
// default restock = 1 item
const restockSweet = async (req, res) => {
  try {
    const amount = Number(req.body.amount) || 1;

    const sweet = await sweetService.restockSweet(
      req.params.id,
      amount
    );

    return res.status(200).json({
      message: "Restock successful",
      sweet,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};
