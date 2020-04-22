// index for service
const express = require('express');
var router = express.Router();

var addevents = require('./addevents');
router.use('/', addevents.router);

var view = require('./view');
router.use('/',view.router);

var interested = require('./interestedInEvent');
router.use('/',interested.router);

module.exports.router = router;