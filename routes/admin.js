const express = require('express');
const {getAllUsers, getAUser} = require("../src/controllers/adminController");

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/rides');
router.get('/payments');

router.get('/users/:id', getAUser);
router.put('/block/:userId');
router.delete('/delete/:userId');

module.exports = router;

