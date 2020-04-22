var express = require('express');
var axios = require('axios');
const config = require('./config');

var router = express.Router();


router.post('/forgotpassword', function (request, response) {
    console.log('HIT /forgotpassword');

    // validation @userid
    if (request.body.username == false) {
        // bad request
        console.log('Invalid credentials')
        response.status(400).send('Invalid credentials');
        return;
    }

    const sql = `select * from personal_details 
                where user_id= (select user_id from auth 
                    where user_username = '${request.body.username}')
                    `;


    config.CONNECTION.query(sql, function (error, result) {
        if (error) {
            // query execution failed
            console.log(error)
            response.status(500).send('Oops! Something went wrong');
        } else {

            console.log(result);
            if (result.length) {
                let phone_number = result[0].phone_number;
                let user_id = result[0].user_id;


                 axios({
                     url: `http://sms:3000/otp`,
                     method: 'POST',
                     data: {
                         phone_number : phone_number,
                         user_id:user_id
                     }
                 }).then(() => {
                     // OTP generated
                     response.sendStatus(200);
                     let username = request.body.username;
                         axios({
                             url: `http://authentication:3000/changepassword`,
                             method: 'POST',
                             data: {
                                 username: username
                             }
                         }).then(()=>{
                             response.status(200).send('Password changes successfully');

                         }).catch(error=>{
                              if (typeof error.response !== 'undefined') {
                                  console.log(`${error.response.status} => ${error.response.data}`);
                              } else {
                                  console.log(`${error}`);
                              }
                              response.status(503).send('Can not change password');

                         })


                 }).catch(error => {
                     // error
                     if (typeof error.response !== 'undefined') {
                         console.log(`${error.response.status} => ${error.response.data}`);
                     } else {
                         console.log(`${error}`);
                     }
                     response.status(503).send('Could not send OTP');
                 });
                 }
                 else {
                     // error
                     response.status(400).send('User not found');
                 }
            }
        });
    });

module.exports.router = router;