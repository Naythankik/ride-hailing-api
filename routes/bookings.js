const express = require('express');
const { registerRide, updateRide, findRides, requestRide, acceptRide, readRequest, startRide, completeRide, cancelRequest,
    getHistories
} = require("../src/controllers/rideController");
const { riderAuthorization, userAuthorization } = require("../src/middleware/authorization");
const router = express.Router();

router.post('/register', riderAuthorization, registerRide);
router.put('/update', riderAuthorization, updateRide);

router.get('/available',userAuthorization, findRides);
router.get('/history', getHistories);

router.post('/request/:rideId', userAuthorization, requestRide);
router.post('/start/:requestId', riderAuthorization, startRide);
router.post('/complete/:requestId', riderAuthorization, completeRide);
router.post('/cancel/:requestId', userAuthorization, cancelRequest);
router.get('/request/read/:requestId', riderAuthorization, readRequest);
router.post('/accept/:requestId/:response', riderAuthorization, acceptRide);

router.get('estimate');

module.exports = router;

