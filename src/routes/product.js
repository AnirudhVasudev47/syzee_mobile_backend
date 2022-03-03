const express = require('express');
const {getProductById, getProductId} = require("../controllers/product");
const router = express.Router();

router.post('/id/product', getProductById);

router.post('/product/getId', getProductId);

module.exports = router;