const express = require("express");
const mongoose = require("mongoose");

const itemController = require("./MVC Structure/Controller/itemController");
const sliderItemController = require("./MVC Structure/Controller/sliderItemController");
const newItemController = require("./MVC Structure/Controller/newItemController");

// express app initialization
const app = express();
app.use(express.json());


mongoose
  .connect("mongodb://localhost/cloudkitchenDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// application routes
app.use("/items", itemController);
app.use("/sliderItems", sliderItemController);
app.use("/newItems", newItemController);

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

module.exports = app.listen(7000, () => {
  console.log("app listening at port 7000");
});
