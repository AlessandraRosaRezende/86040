const orderModel = require("../models/orders.model")

const getOrders = async () => {
  const orders = await orderModel.find()
  return orders;
};

const getOrderById = async (id) => {
  const order = await orderModel.findById(id);
  return order;
};

const createOrder = async (order) => {
  const orderCreated = await orderModel.create(order)
  return orderCreated;
};

const updateOrder = async (id, order) => {
  const orderUpdated = await orderModel.findByIdAndUpdate(id, { $set: order })
  return orderUpdated;
}

module.exports = { getOrders, getOrderById, createOrder, updateOrder }