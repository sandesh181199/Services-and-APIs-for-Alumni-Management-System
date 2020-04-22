// index for service
const express = require('express');
var router = express.Router();

var roles = require('./roles');
router.use('/', roles.router);

module.exports.router = router;