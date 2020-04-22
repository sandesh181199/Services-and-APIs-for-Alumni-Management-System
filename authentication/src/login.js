const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('./config');
const axios = require('axios');

var router = express.Router();


router.post('/login', (request, response) => {
    console.log('Hey There')
    var sql = `SELECT *
                FROM auth
                WHERE user_username = '${request.body.username}'`

    config.CONNECTION.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            response.sendStatus(503);
            return;
        } else {
            bcrypt.compare(request.body.password, result[0].user_password, (error, verify) => {
                if (error) {
                    console.log(error);
                    response.status(503).json({
                        message: "Bcryptjs Error"
                    });
                } else if (verify === false) {
                    response.status(400).json({
                        message: "Wrong Username or Password"
                    });
                } else {
                    console.log('Redirecting to Roles Generation');
                    axios({
                        url: `http://roles:3000/roles`,
                        method: 'POST',
                        data: { userid: result[0].user_id }
                    }).then((roles) => {
                        axios({
                            url: `http://token:3000/generate`,
                            method: 'POST',
                            data: {
                                user_id: result[0].user_id,
                                roles: roles.data
                            }
                        }).then((token) => {
                            response.status(200).json({ token: token.data });
                        }).catch(error => {
                            console.log(error);
                            response.status(503).json({ message: "Could not generate token" });
                        })
                    }).catch(error => {
                        console.log(error);
                        response.status(503).json({ message: "Could not roles" });
                    })
                }
            })

        }
    })

})


module.exports.router = router;