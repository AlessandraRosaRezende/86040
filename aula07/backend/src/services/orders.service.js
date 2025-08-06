const orderDao = require("../dao/orders.dao");
const userDao = require("../dao/users.dao");
const businessDao = require("../dao/business.dao");

const getOrders = async () => {
  const orders = await orderDao.getOrders();
  return orders;
};

const getOrderById = async (id) => {
  const order = await orderDao.getOrderById(id);
  if (!order) return null;
  return order;
};

const createOrder = async (userId, businessId, productIds) => {
  const user = await userDao.getUserById(userId);
  if (!user) return { error: "User not found" };

  const business = await businessDao.getBusinessById(businessId);
  if (!business) return { error: "Business not found" };

  const actualProducts = business.products.filter(p => productIds.includes(p.id));
  const totalPrice = actualProducts.reduce((sum, item) => sum + item.price, 0);

  const orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);
  const newOrderData = {
    number: orderNumber,
    business: businessId,
    user: userId,
    status: "pending",
    products: actualProducts.map(p => p.id),
    totalPrice,
  };

  const newOrder = await orderDao.createOrder(newOrderData);
  user.orders.push(newOrder._id);
  await userDao.updateUser(userId, user);

  return newOrder;
};

const updateOrderStatus = async (id, status) => {
  const order = await orderDao.getOrderById(id);
  if (!order) return null;

  order.status = status;
  const updated = await orderDao.updateOrder(id, order);
  return updated;
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};
