const express = require('express');

const router = express.Router();

router.get('initiate');
router.post('confirm');
router.get('history');

module.exports = router;

