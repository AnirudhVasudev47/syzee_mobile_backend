const express = require("express");
const router = express.Router();

const {
  test, signup, checkUser, signin
} = require("../controllers/user")

// test
router.get('/user/test', test);

// User check
router.post ('/user/checkUser', checkUser);

// sign up
router.post('/user/signup', signup);

// sign in
router.post('/user/signin', signin);

// sizing profile
// get all profiles


module.exports = router;