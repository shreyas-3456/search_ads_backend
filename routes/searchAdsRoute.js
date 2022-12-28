const express = require('express');
const { searchAds } = require('../controllers/searchAds');
const router = express.Router();

router.route('/').get(searchAds);

module.exports = router;
