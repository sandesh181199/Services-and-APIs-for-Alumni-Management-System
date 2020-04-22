const jwt = require('jsonwebtoken');
const config = require('./config');
const express = require('express');

var router = express.Router();

router.post('/generate', (request, response) => {


    jwt.sign({
        userid: request.body.user_id,
        roles: request.body.roles
    }, config.SECRET, (error, token) => {
        if (error) {
            console.log(error);
            response.status(500).json({ message: "Token generation Failed" });
        } else {
            // token generated
            console.log('Token generated');
            response.status(200).send(token);
        }
    });

})

module.exports.router = router;