const express = require('express');
const router = express.Router();
const passport = require('./../../passport');

router.get('/', require('./user-get'));
router.post('/', require('./user-post'));
router.post('/login', passport.authenticate('local'), require('./login'));

module.exports = router;