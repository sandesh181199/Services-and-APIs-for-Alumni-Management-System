// index for service
const express = require('express');
var router = express.Router();
/*
login
*/
var login = require('./login');
router.use('/', login.router);

var register = require('./register');
router.use('/', register.router);

var forgotpassword = require('./forgotpassword');
router.use('/', forgotpassword.router);

var signup = require('./signup');
router.use('/', signup.router);


module.exports.router = router;