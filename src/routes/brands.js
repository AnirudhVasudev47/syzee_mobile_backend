const express = require("express");
const {getAllBrandsList, getAllBrandProducts} = require("../controllers/brands");
const router  = express.Router();

// Get All brands
router.get('/brands/list/all', getAllBrandsList);

// Get products of a brand
router.get('/brands/product/:brandId', getAllBrandProducts);

module.exports = router;
