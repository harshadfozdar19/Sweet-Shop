const Sweet = require("../models/Sweet");

// create sweet
const createSweet = async (data) => {
  return await Sweet.create(data);
};

// get all sweets
const getAllSweets = async () => {
  return await Sweet.find();
};

// search sweets
const searchSweets = async (query) => {
  const filter = {};

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.minPrice && query.maxPrice) {
    filter.price = {
      $gte: Number(query.minPrice),
      $lte: Number(query.maxPrice),
    };
  }

  return await Sweet.find(filter);
};

// update sweet
const updateSweet = async (id, data) => {
  const sweet = await Sweet.findByIdAndUpdate(id, data, { new: true });
  if (!sweet) throw new Error("Sweet not found");
  return sweet;
};

// delete sweet
const deleteSweet = async (id) => {
  const sweet = await Sweet.findByIdAndDelete(id);
  if (!sweet) throw new Error("Sweet not found");
};

// purchase sweet
const purchaseSweet = async (id, amount = 1) => {
  // console.log("Purchase request:", id, amount);
   // 👈 TEMP LOG

  const sweet = await Sweet.findById(id);

  if (!sweet) throw new Error("Sweet not found");
  if (amount <= 0) throw new Error("Invalid purchase amount");
  if (sweet.quantity < amount) throw new Error("Not enough stock");

  sweet.quantity -= amount;
  await sweet.save();

  return sweet;
};


// restock sweet
const restockSweet = async (id, amount = 1) => {
  const sweet = await Sweet.findById(id);

  if (!sweet) throw new Error("Sweet not found");
  if (amount <= 0) throw new Error("Invalid restock amount");

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
  restockSweet,
};
