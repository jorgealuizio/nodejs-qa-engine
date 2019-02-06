const express = require('express');
const router = express.Router();

router.get('/', require('./user-get'));

module.exports = router;