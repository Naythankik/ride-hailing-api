const express = require('express');

const router = express.Router();

router.get('/profile');
router.post('/logout')
router.put('/update')
router.delete('/delete/:id')
router.put('/change-password')

module.exports = router;

