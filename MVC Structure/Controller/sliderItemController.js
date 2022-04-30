const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const sliderItemModel = require("../Model/sliderItemModel");
const SliderItem = new mongoose.model("SliderItem", sliderItemModel);

// GET ALL THE Admin
router.get("/", async (req, res) => {
  await SliderItem.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});

// POST A Review
router.post("/addSliderItem", async (req, res) => {
    const newSliderItem = new SliderItem(req.body);
    await newSliderItem.save((err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "slider item was inserted successfully!",
        });
      }
    });
  });

module.exports = router;
