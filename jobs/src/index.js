// index for service
const express = require('express');
var router = express.Router();

var postjobs = require('./postjobs');
router.use('/', postjobs.router);

module.exports.router = router;