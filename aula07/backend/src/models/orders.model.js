const mongoose = require("mongoose");
const orderCollection = "Orders";

const orderSchema = new mongoose.Schema({
  number: Number,
  business: {
    type: mongoose.Schema.ObjectId,
    ref: "Business",
  },
  status: {
    type: String,
    enum: ["pending", "preparing", "delivering", "delivered", "canceled"],
    default: "pending",
  },
  users: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  products: [],
  totalPrice: Number,
});

const orderModel = mongoose.model(orderCollection, orderSchema);

module.exports = orderModel;
