var express = require('express');
var axios = require('axios');
const config = require('./config');
const bcrypt = require('bcryptjs');

var router = express.Router();


router.post('/changepassword', function (request, response) {
    console.log('HIT /changepassword');

    // validation @userid
    // if (request.body.username == false) {
    //     // bad request
    //     console.log('Invalid credentials')
    //     response.status(400).send('Invalid credentials');
    //     return;
    // }
    var sql = `SELECT *
                FROM auth
                WHERE user_username = '${request.body.username}'`

    config.CONNECTION.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            response.sendStatus(503);
            return;
        } else {
            let new_password = request.body.new_password;
            let confirm_password = request.body.confirm_password;
            let uniq = result[0].user_id;
            if (new_password == confirm_password) {
                bcrypt.hash(new_password, 8, (error, hash) => {
                    var sql10 = `update auth set user_password='${hash}' where user_username = '${request.body.username}'`

                    config.CONNECTION.query(sql10, (error10, result10) => {
                        if (error10) {
                            console.log(error10);
                            response.status(500).json({
                                message: "Could not change password"
                            });
                            return;
                        } else {
                            response.status(200).json({
                                message: "Password changes Successfully!"
                            });
                        }
                    })
                })
            } else {
                response.status(400).json({
                    message: "Confirm password should be equal to your new password"
                })

            }

        }

    })

});

module.exports.router = router;