const express = require("express");
const {getOrderDetails, getUserOrderHistory, placeOrderFromCart} = require("../controllers/order");
const router = express.Router();

router.post('/order/user/history', getUserOrderHistory);

router.post('/history/order/details', getOrderDetails);

router.post('/order/place/order', placeOrderFromCart);

module.exports = router;