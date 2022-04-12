const express = require('express');
const {
	getProductById,
	getProductId,
	getProductTable,
	getCompleteLook,
	getProductReview
} = require("../controllers/product");
const router = express.Router();

router.post('/id/product', getProductById);

router.post('/product/getId', getProductId);

router.post('/product/table', getProductTable);

router.post('/product/complete_look', getCompleteLook);

router.post('/product/review', getProductReview);

module.exports = router;