const express = require('express');

const router = express.Router();

router.post('/rider/:rideId');
router.post('/driver/rideId');
router.get(':userId')

module.exports = router;
