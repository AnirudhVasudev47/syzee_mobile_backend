const express = require("express");
const {getOrderDetails, getUserOrderHistory} = require("../controllers/order");
const router = express.Router();

router.post('/order/user/history', getUserOrderHistory)

router.post('/history/order/details', getOrderDetails)

module.exports = router;