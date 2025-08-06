const orderDao = require('../dao/orders.dao');
const userDao = require('../dao/users.dao');
const businessDao = require('../dao/business.dao');

const getOrders = async (req, res) => {
  try {
    const orders = await orderDao.getOrders();
    res.status(200).send({ result: orders });
  } catch (error) {
    res.status(500).send({ status: "error", result: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { oid } = req.params;
  try {
    const order = await orderDao.getOrderById(oid);
    if (!order) return res.status(404).send({ message: "Order not found" });
    return res.status(200).send({ status: "success", result: order });
  } catch (error) {
    res.status(500).send({ status: "error", result: error.message });
  }
};

const createOrder = async (req, res) => {
  const { user, products, business } = req.body;
  try {
    const resultUser = await userDao.getUserById(user);
    if (!resultUser) return res.status(404).send({ message: "User not found" });
    
    const resultBusiness = await businessDao.getBusinessById(business);
    if (!resultBusiness) return res.status(404).send({ message: "Business not found" });

    const actualOrder = resultBusiness.products.filter(product => products.includes(product.id));
    const sum = actualOrder.reduce((acc, prev) => {
      acc += prev.price
      return acc
    }, 0);

    const orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);

    const order = {
      number: orderNumber,
      business,
      user,
      status: "pending",
      products: actualOrder.map(product => product.id),
      totalPrice: sum
    };

    const newOrder = await orderDao.createOrder(order);
    resultUser.orders.push(newOrder._id)

    await userDao.updateUser(user, resultUser)
    return res.status(201).send({ result: newOrder });
  } catch (error) {
    return res.status(500).send({ status: "error", result: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { oid } = req.params;
  const { resolve } = req.query;

  try {
    const order = await orderDao.getOrderById(oid);
    if (!order) return res.status(404).send({ status: "error", result: "Order not found" });

    order.status = resolve;
    const updatedOrder = await orderDao.updateOrder(oid, order) //poderia usar o order._id

    if (updatedOrder.modifiedCount === 0) {
      return res.status(404).send({ result: "No changes made" });
    }

    res.send({ status: "success", result: "Order updated successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", result: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
};
