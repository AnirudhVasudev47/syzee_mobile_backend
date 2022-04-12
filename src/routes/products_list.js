const express = require("express");
const {
	test,
	productsSubCategory,
	getWomenNewIn,
	searchProducts,
	getAllClothing,
	getGifts,
	productsCategory
} = require("../controllers/products_list");
const router = express.Router();

router.get('/products_list/test', test);

router.post('/products_list/sub_category', productsSubCategory);

router.post('/products_list/category', productsCategory);

router.post('/product_list/newIn', getWomenNewIn);

router.post('/products_list/search', searchProducts);

router.post('/product_list/listByName',);

router.post('/product_list/allClothing', getAllClothing);

router.post('/product_list/gifts', getGifts);

module.exports = router;