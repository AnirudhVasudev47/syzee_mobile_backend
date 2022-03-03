const express = require("express");
const {getWomenCategories, getMenCategories, getKidsCategories} = require("../controllers/categories");
const router = express.Router();

router.get('/categories/women', getWomenCategories);

router.get('/categories/men', getMenCategories);

router.get('/categories/kids', getKidsCategories);

module.exports = router;