const jwt = require('jsonwebtoken');
const config = require('./config');
const express = require('express');

var router = express.Router();

router.post('/verify', (request, response) => {
    jwt.verify(request.body.token, config.SECRET, (error, data) => {
        if (error) {
            console.log(error);
            response.status(400).json({ message: "Token Verification Failed" });
            return;
        } else {
            let permitted = false;
            for (let index = 0; index < data.roles.length; index++) {
                if (data.roles[index] == request.body.PERMISSION_ID) {
                    permitted = true;
                    break;
                }
            }
            if (permitted) {
                response.status(200).json(data);
            } else {
                response.status(400).json({ message: "Not Permitted" });
            }
        }
    })
})

module.exports.router = router;