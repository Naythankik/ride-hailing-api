const express = require('express');
const { profile, logout, update, changePassword } = require("../src/controllers/userController");

const router = express.Router();

router.get('/profile', profile);
router.post('/logout', logout)
router.put('/update', update)
router.delete('/delete/:id')
router.put('/change-password', changePassword)

module.exports = router;

