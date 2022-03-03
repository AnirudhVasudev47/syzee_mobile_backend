const express = require("express");
const router = express.Router();

const {
  test, homeTabBanner, homeTabCategories, homeTabBrands, homeTabMostWanted, homeTabMostPopular, getLookOfTheDay,
  getWeeksHighlights, getMostWanted
} = require("../controllers/home_tab")

// test
router.get('/home_tab/test', test)

// banner route
router.get('/home_tab/banner', homeTabBanner);

// category
router.get('/home_tab/category', homeTabCategories)

// Shop By Brands
router.get('/home_tab/brands', homeTabBrands);

// Most Popular
router.get('/home_tab/most_popular', homeTabMostPopular);

// Look of the day
router.get('/home_tab/lookOfTheDay', getLookOfTheDay);

// Week's Highlights
router.get('/home_tab/weekshighlights', getWeeksHighlights);

// Most Wanted
router.get('/home_tab/mostwanted', getMostWanted);

module.exports = router;