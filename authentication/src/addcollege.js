const express = require('express');
const bcrypt = require('bcryptjs');
var config = require('./config');
const config = require('./config');


var router = express.Router();


router.post('/addcollege', (request, response) => {

axios({
url: `http://token:3000/verify`,
method: 'POST',
data: {
    token: request.headers["authorization"]
}
}).then((data) => {
let user_id = data.user_id;

sql = `select *
            from student_college_info where college_id= 
            (select college_id from personal_details where user_id = data.user_id)`

config.CONNECTION.query(sql, (error, result) => {
    if (error) {
        console.log(error);
        response.sendStatus(503);
        return;
    } else {
        let phone_number = result[0].student_number;
        axios({
            url: `http://sms:3000/otp`,
            method: 'POST',
            data: {
                phone_number: phone_number,
                user_id: user_id
            }
        }).then({
            update_student_college(phone_number);
        }).catch(error => {

            console.log(error)
        })
    }
    axios({
        url: `http://sms:3000/otp`,
        method: 'POST',
        data: {
            phone_number: phone_number,
            user_id: user_id
        }


    }).then({

        update_student_college(phone_number)
    }).catch(error => {


    })


})
})

function update_student_college(phone_number) {
sql = ` update student_college_info set student_registered='1' where
        student_number = '${phone_number}'`
config.CONNECTION.query(sql, function (err, result) {
    if (error) {
        console.log(error);
        response.sendStatus(503);
        return;
    } else {
        console.log('updated student_college_info succesfully');
    }
})



}

})


module.exports.router = router;