const express = require('express');
const passport = require('passport');
const { checkAuth, logout, login } = require('../../services/auth/checkAuth');

let router = express.Router();
router.get('/auth', checkAuth);
router.post('/login', passport.authenticate('local'), login);
router.post('/logout', logout);

module.exports = router;