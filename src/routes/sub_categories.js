const express = require("express");
const {getSubCategories, checkSubCategory} = require("../controllers/sub_categories");
const router = express.Router();

router.post('/sub_category', getSubCategories);

router.post('/check_sub_category', checkSubCategory);

module.exports = router;