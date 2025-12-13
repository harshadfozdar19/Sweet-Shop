const Sweet = require("../models/Sweet");

// create sweet
const createSweet = async (data) => {
  const sweet = await Sweet.create(data);
  return sweet;
};

// get all sweets
const getAllSweets = async () => {
  return Sweet.find();
};

// search sweets
const searchSweets = async (query) => {
  const searchQuery = {};

  if (query.name) {
    searchQuery.name = { $regex: query.name, $options: "i" };
  }
  if (query.category) {
    searchQuery.category = query.category;
  }
  if (query.minPrice || query.maxPrice) {
    searchQuery.price = {};
    if (query.minPrice) searchQuery.price.$gte = query.minPrice;
    if (query.maxPrice) searchQuery.price.$lte = query.maxPrice;
  }

  return Sweet.find(searchQuery);
};

// update sweet
const updateSweet = async (id, data) => {
  const sweet = await Sweet.findByIdAndUpdate(id, data, { new: true });
  return sweet;
};

// delete sweet
const deleteSweet = async (id) => {
  return Sweet.findByIdAndDelete(id);
};


// purchase sweet
const purchaseSweet = async (id, amount) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  if (sweet.quantity < amount) {
    throw new Error("Not enough stock");
  }

  sweet.quantity -= amount;
  await sweet.save();

  return sweet;
};

// restock sweet (admin)
const restockSweet = async (id, amount) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  sweet.quantity += amount;
  await sweet.save();

  return sweet;
};


module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet, 
  purchaseSweet,
  restockSweet
};
