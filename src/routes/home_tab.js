const express = require("express");
const router = express.Router();

const {
  test, homeTabBanner, homeTabCategories, homeTabBrands, homeTabMostWanted, homeTabMostPopular
} = require("../controllers/home_tab")

// test
router.get('/home_tab/test', test)

// banner route
router.get('/home_tab/banner', homeTabBanner);

// category
router.get('/home_tab/category', homeTabCategories)

// Shop By Brands
router.get('/home_tab/brands', homeTabBrands);

// Most Wanted
router.get('/home_tab/most_wanted', homeTabMostWanted);

// Most Popular
router.get('/home_tab/most_popular', homeTabMostPopular);

module.exports = router;