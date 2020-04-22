// index for service
const express = require('express');
var router = express.Router();
/*
login
*/
var verify = require('./verify');
router.use('/', verify.router);

var generate = require('./generate');
router.use('/', generate.router);


module.exports.router = router;