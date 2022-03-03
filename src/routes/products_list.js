const express = require("express");
const {test, productsSubCategory, getWomenNewIn, searchProducts} = require("../controllers/products_list");
const router = express.Router();

router.get('/products_list/test', test);

router.post('/products_list/sub_category', productsSubCategory);

router.post('/product_list/newIn', getWomenNewIn);

router.post('/products_list/search', searchProducts);

router.post('/product_list/listByName', )

module.exports = router;