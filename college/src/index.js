// index for service
const express = require('express');
var router = express.Router();

var verify = require('./verify');
router.use('/', verify.router);

var registered = require('./registered');
router.use('/', registered.router);

module.exports.router = router;