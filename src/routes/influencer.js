const express = require("express");
const {listOfInfluencer, getStoriesById} = require("../controllers/influencer");
const router  = express.Router();

router.get('/influencer/list', listOfInfluencer);

router.get('/influencer/stories/:id', getStoriesById);

module.exports = router;