const { Router } = require("express");
const orderController = require("../controllers/orders.controller");

const router = Router();

router.get("/", orderController.getOrders);
router.post("/", orderController.createOrder);
router.get("/:oid", orderController.getOrderById);
router.patch("/:oid", orderController.updateOrder);

module.exports = router;
