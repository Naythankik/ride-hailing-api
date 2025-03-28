const express = require('express');

const router = express.Router();

router.get('/available');
router.get('/history');

router.post('/request/:rideId');
router.post('/accept/:rideId');
router.post('/start/:rideId');
router.post('/complete/:rideId');
router.post('/cancel/:rideId');

router.get('estimate');

module.exports = router;

