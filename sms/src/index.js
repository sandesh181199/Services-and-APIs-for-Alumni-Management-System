// index for service
const express = require('express');
var router = express.Router();
/*
login
*/
var otp = require('./otp');
router.use('/', otp.router);

var sendsms = require('./sendsms');
router.use('/',sendsms.router);


module.exports.router = router;