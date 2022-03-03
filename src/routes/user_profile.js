const express = require("express");
const {
	getUsersAddress,
	addAddress,
	updateAddress,
	deleteUserAddress,
	getUsersSizingProfiles,
	updateUserSizingProfile,
	addUserSizingProfile, delUserSizingProfile, updateDefaultSizeProfile,
} = require("../controllers/user_profile");
const router = express.Router();

// address routes
// get address
router.post('/user/get/address', getUsersAddress);
// add address
router.post('/user/add/address', addAddress);
// update address
router.put('/user/update/address', updateAddress);
// delete address
router.delete('/user/delete/address', deleteUserAddress);

// sizing profile
// get all profiles
router.post('/user/get/sizingProfile', getUsersSizingProfiles);
// update profile
router.post('/user/update/sizingProfile', updateUserSizingProfile);
// add profile
router.post('/user/add/sizingProfile', addUserSizingProfile);
// delete profile
router.delete('/user/delete/sizingProfile/:id', delUserSizingProfile);
// update profile
router.post('/user/update/default/sizingProfile', updateDefaultSizeProfile);

module.exports = router;