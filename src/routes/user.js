const express = require("express");
const router = express.Router();

const {
  test, homeTabBanner, homeTabCategories, homeTabBrands, homeTabMostWanted, homeTabMostPopular, signup, checkUser
} = require("../controllers/user")

// test
router.get('/user/test', test);

// User check
router.post ('/user/checkUser', checkUser);

// sign up
router.post('/user/signup', signup)

// sizing profile
// get all profiles


module.exports = router;