const express = require('express');
const { forgot, reset } = require('../services/passwordReset');

let router = express.Router();
router.post('/forgot', forgot);
router.post('/reset/:id/:token', reset);

module.exports = router;