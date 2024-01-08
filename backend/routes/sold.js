const { markSold, deleteItem } = require('../services/sold');
const express = require('express');
let router = express.Router();

router.put('/markSold/:id', markSold);
router.delete('/deleteItem/:id', deleteItem);
module.exports = router;