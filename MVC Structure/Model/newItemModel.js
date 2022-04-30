const mongoose = require("mongoose");

const newItemModel = mongoose.Schema({
  name: String,
  price: Number,
  img: String,
});

module.exports = newItemModel;
