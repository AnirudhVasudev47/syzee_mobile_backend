const express = require('express');
const {getProductById, getProductId, getProductTable, getCompleteLook} = require("../controllers/product");
const router = express.Router();

router.post('/id/product', getProductById);

router.post('/product/getId', getProductId);

router.post('/product/table', getProductTable);

router.post('/product/complete_look', getCompleteLook)

module.exports = router;