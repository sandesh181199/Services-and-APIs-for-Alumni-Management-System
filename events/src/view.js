const express = require('express');
const config = require('./config');
var router = express.Router();


router.post('/view', (request, response) => {

    // let user_id = '4wpazefwk59ocabn';

    axios({
        url: `http://token:3000/verify`,
        method: 'POST',
        data: {
            token: request.headers["authorization"]
        }
    }).then((data) => {

        let user_id = data.user_id;

        var sql = `select * from events where college_id=(select college_id from personal_details where user_id='${user_id}')`
        config.CONNECTION.query(sql, (err, result) => {
            if (err) {
                // query execution failed
                console.log(error)
                response.status(500).send('Oops! Something went wrong');
            } else {
                console.log(result);
                response.status(200).send(result[0]);
            }
        })

        response.sendStatus(200);

    }).catch(error => {
        console.log('error in token verification');
    })


})

module.exports.router = router;