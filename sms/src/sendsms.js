var express = require('express');
var unirest = require('unirest');
var config = require('./config');
// var generator = require('generate-password');

var router = express.Router();

router.post('/sendsms',function(req,res){

      let otp_request = unirest("GET", "https://www.fast2sms.com/dev/bulk");
        otp_request.query({
                            "authorization": "JD3qmIT98KPU1GVEvZLYrBgF4HRNt5WSXQ6xwyeks0ajpibzMChXTD62fbsv0MrFgjCyzQkuINoZcx9W",
                            "sender_id": "FSTSMS",
                            "language": "english",
                            "route": "qt",
                            "numbers": `${request.body.phone_number}`,
                            "message": "15009",
                            "variables": "{BB}",
                            "variables_values": ` ${otp}`
                        });

                        otp_request.headers({
                            "cache-control": "no-cache"
                        });


                        otp_request.headers({
                            "cache-control": "no-cache"
                        });

                        otp_request.end(function (response_otp) {
                            if (response_otp.error) {
                                console.log(response_otp.error);
                                response.status(503).send("Oops! Something went wrong");
                            } else {
                                console.log(response_otp.body);
                                response.sendStatus(200);
                            }
                        });

});
module.exports.router = router;