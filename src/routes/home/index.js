const express = require('express');
const router = express.Router();
const isAuth = require('./../../middlewares/isAuth');

router.get('/t/:username', isAuth, require('./main'));
router.get('/', isAuth, require('./move-to-main'));

module.exports = router;