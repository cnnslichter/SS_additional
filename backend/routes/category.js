const express = require('express');
const {
    getItems,
    getTextbooks,
    getClothes,
    getGeneralDecor,
    getFurniture,
    getAppliances,
    getOther
} = require('../services/category');

let router = express.Router();
router.get('/getItems', getItems);
router.get('/getTextbooks', getTextbooks);
router.get('/getClothes', getClothes);
router.get('/getGeneralDecor', getGeneralDecor);
router.get('/getFurniture', getFurniture);
router.get('/getAppliances', getAppliances);
router.get('/getOther', getOther);

module.exports = router;