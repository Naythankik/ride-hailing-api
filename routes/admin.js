const express = require('express');
const {getAllUsers, getAUser, getAllRides, getARide, blockUser, deleteUser} = require("../src/controllers/adminController");

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/rides', getAllRides);

router.get('/users/:id', getAUser);
router.get('/rides/:id', getARide);
router.put('/block/:userId', blockUser);
router.delete('/delete/:userId', deleteUser);

module.exports = router;

