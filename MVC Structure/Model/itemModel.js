const mongoose = require("mongoose");

const itemModel = mongoose.Schema({
  name: String,
  price: Number,
  img: String,
});

module.exports = itemModel;
