const mongoose = require("mongoose");

const sliderItemModel = mongoose.Schema({
 img: String,
 title:String,
 desc: String,
 bg: String
});

module.exports = sliderItemModel;