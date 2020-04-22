var express = require('express');
var unirest = require('unirest');
var config = require('./config');
// var generator = require('generate-password');

var router = express.Router();


// route        : /generate
// params       : 
// use          : generates otp for authenticated users


router.post('/otp', function (request, response) {
    console.log('HIT /otp');
    var sql1 = `select * from otp where user_id='${request.body.user_id}'`
    config.CONNECTION.query(sql1, function (err, result10) {
        if (err) {
            console.log(err)
            response.status(500).send("Oops! Something went wrong inside sql");
        } else {


            var today = new Date();
            var date_today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time_today = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime_today = date_today + ' ' + time_today;
            var timestamp_otp = result10[0].otp_ts;
            var date = timestamp_otp.getFullYear() + '-' + (timestamp_otp.getMonth() + 1) + '-' + timestamp_otp.getDate();
            var time = timestamp_otp.getHours() + ":" + timestamp_otp.getMinutes() + ":" + timestamp_otp.getSeconds();
            var dateTime = date + ' ' + time;

            let otp = Math.random();
            otp *= 100000;
            otp = Math.round(otp);

            if (date_today == date && today.getHours() * 60 * 60 + today.getMinutes() * 60 + today.getSeconds() < timestamp_otp.getHours() * 60 * 60 + timestamp_otp.getMinutes() * 60 + timestamp_otp.getSeconds() + 900) {
                console.log('In 15 min')
                console.log(`OTP ${otp} for ${request.body.phone_number}`);

                let phone_number = request.body.phone_number
                        axios({
                            url: `http://sms:3000/sendsms`,
                            method: 'POST',
                            data: {
                               phone_number: phone_number
                            }
                        }).then(() => {

                            response.sendStatus(200);
                        }).catch(error => {
                            // error
                            if (typeof error.response !== 'undefined') {
                                console.log(`${error.response.status} => ${error.response.data}`);
                            } else {
                                console.log(`${error}`);
                            }
                            response.status(503).send('Could not send OTP');
                        });

                    
                
            } else {

                console.log('Not in 15 min')

                // generate otp
                // let otp = Math.random();
                //  otp *= 100000;
                //  otp = Math.round(otp);

                var today = new Date();
                var date_today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time_today = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime_today = date_today + ' ' + time_today;

                var sql = `INSERT INTO otp VALUES('${request.body.userid}', ${otp}, '${dateTime_today}')
                                    ON duplicate KEY UPDATE otp_value = ${otp}, otp_ts = '${dateTime_today}'`
                config.connection.query(sql, function (error, result) {
                    if (error) {
                        console.log(error)
                        response.status(500).send("Oops! Something went wrong");
                    } else {

                                console.log(`OTP ${otp} for ${request.body.phone_number}`);

                                let phone_number= request.body.phone_number;

                                axios({
                                    url: `http://sms:3000/sendsms`,
                                    method: 'POST',
                                    data: {
                                        phone_number:phone_number
                                    }
                                }).then(() => {

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
                })
            }
        }
    })
})

module.exports.router = router;