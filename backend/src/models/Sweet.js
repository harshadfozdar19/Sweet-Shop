const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Sweet", sweetSchema);
