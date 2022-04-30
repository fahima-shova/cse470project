const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const newItemModel = require("../Model/newItemModel");
const NewItem = new mongoose.model("NewItem", newItemModel);

// GET ALL THE Item
router.get("/", async (req, res) => {
  await NewItem.find((err, data) => {
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

// GET A Item by ID
router.get("/:id", async (req, res) => {
  await NewItem.find({ _id: req.params.id }, (err, data) => {
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

// POST A Item
router.post("/addItem", async (req, res) => {
  const newItem = new NewItem(req.body);
  await newItem.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Item was inserted successfully!",
      });
    }
  });
});

// DELETE Item
router.delete("/:id", async (req, res) => {
  await NewItem.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Item was deleted successfully!",
      });
    }
  });
});

module.exports = router;
