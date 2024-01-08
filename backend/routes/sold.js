const { markSold, deleteItem, bookmarkItem } = require('../services/sold');
const express = require('express');
let router = express.Router();

router.put('/markSold/:id', markSold);
router.delete('/deleteItem/:id', deleteItem);
router.put('/bookmarkItem/:id', bookmarkItem);
module.exports = router;