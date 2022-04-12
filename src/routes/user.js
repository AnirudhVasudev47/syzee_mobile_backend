const express = require("express");
const router = express.Router();

const {
  test, signup, checkUser, signin, addToCart, getCartByUserEmail, getAllCoupons, deleteFromCart, setCartQuantity,
  getUserDetailsByMail, getUserWishlist, addToWishlist, removeFromWishlist, updateUserDetails
} = require("../controllers/user")

// test
router.get('/user/test', test);

// User check
router.post ('/user/checkUser', checkUser);

// sign up
router.post('/user/signup', signup);

// sign in
router.post('/user/signin', signin);

// user data
router.post('/user/fetchDetails', getUserDetailsByMail);

// update user
router.post('/user/update', updateUserDetails)

// cart routes

router.post('/cart/add', addToCart);

router.post('/cart/setCartQuantity', setCartQuantity);

router.post('/cart/getByUserId', getCartByUserEmail);

router.get('/coupon/getCoupons', getAllCoupons);

router.delete('/cart/deleteById', deleteFromCart)

// Wishlist routes
// Get products
router.post('/wishlist/user', getUserWishlist);
// Add to Wishlist
router.post('/wishlist/user/add', addToWishlist)
// Remove from Wishlist
router.post('/wishlist/user/remove', removeFromWishlist);

module.exports = router;