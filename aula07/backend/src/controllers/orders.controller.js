const orderService = require("../services/orders.service");

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    return res.status(200).send({ result: orders });
  } catch (error) {
    return res.status(500).send({ status: "error", result: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { oid } = req.params;
  try {
    const order = await orderService.getOrderById(oid);
    if (!order) return res.status(404).send({ message: "Order not found" });
    return res.status(200).send({ result: order });
  } catch (error) {
    return res.status(500).send({ status: "error", result: error.message });
  }
};

const createOrder = async (req, res) => {
  const { user, products, business } = req.body;
  try {
    const result = await orderService.createOrder(user, business, products);

    if (result?.error === "User not found") {
      return res.status(404).send({ message: "User not found" });
    }
    if (result?.error === "Business not found") {
      return res.status(404).send({ message: "Business not found" });
    }

    return res.status(201).send({ result });
  } catch (error) {
    return res.status(500).send({ status: "error", result: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { oid } = req.params;
  const { resolve } = req.query;

  try {
    const updated = await orderService.updateOrderStatus(oid, resolve);
    if (!updated) return res.status(404).send({ result: "Order not found" });

    return res.send({ result: "Order updated successfully" });
  } catch (error) {
    return res.status(500).send({ status: "error", result: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};
