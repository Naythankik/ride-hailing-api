const express = require('express');
const {rateRider, rateUser} = require("../src/controllers/reviewController");

const router = express.Router();

router.post('/user/:rideId', rateRider);
router.post('/rider/rideId', rateUser);

module.exports = router;
