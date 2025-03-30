const express = require('express');
const {getAllUsers, getAUser, getAllRides, getARide} = require("../src/controllers/adminController");

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/rides', getAllRides);
router.get('/payments');

router.get('/users/:id', getAUser);
router.get('/rides/:id', getARide);
router.put('/block/:userId');
router.delete('/delete/:userId');

module.exports = router;

