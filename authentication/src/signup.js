const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('./config');
const uniqid = require('uniqid');

var router = express.Router();


router.post('/signup', (request, response) => {

     bcrypt.hash(request.body.password, 8, (error, hash) => {
        let uniq= uniqid();
        var sql = `INSERT INTO auth VALUES('${uniq}','${request.body.username}','${hash}')`
        config.CONNECTION.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            response.sendStatus(400);
            return;
        } else {
            console.log(result);
             const personal_sql = `Insert into personal_details
                                 values
                                    (
                                        '${uniq}',
                                        '${request.body.fname}',
                                        '${request.body.lname}',
                                        (select college_id from college_details where college_name='${request.body.college_name}'),
                                        '${request.body.phone_number}',
                                        '${request.body.email}'
                                    )`
            config.CONNECTION.query(personal_sql, function (error, personal_result) {
                    if (error) {
                                    console.log(error);
                                    response.status(500).send('Could not register user');
                                    return;
                                } else {
                                            console.log(JSON.stringify(personal_result));

                                }
        })
    }
})

})
})
module.exports.router = router;