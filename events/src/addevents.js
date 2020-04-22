const express = require('express');
const config = require('./config');
const uniqid = require('uniqid');
var router = express.Router();
const axios = require('axios');

router.post('/addevents', (request, response) => {

    console.log('hit/addevents')
    //  console.log(request.body.name);

    //  console.log(request.data.name);
    //  console.log(request);
      console.log(request.body[0].name);
    


    // var college_id = request.body.college_id;
    // axios({
    //     url: `http://token:3000/verify`,
    //     method: 'POST',
    //     data: {
    //         token: request.headers["authorization"]
    //     }
    // }).then((data) => {
       

        var sql = ` Insert INTO events
                        values 
                    ('${uniqid()}', 
                    (select college_id from college_emp where user_id = 'xab94cok59mlov6'),
                    '${request.body[0].name}',
                    '${request.body[0].desciption}',
                    '${request.body[0].event_date}',
                    '${request.body[0].batch}')`


        config.CONNECTION.query(sql, function (error, result) {
            if (error) {
                // query execution failed
                console.log(error)
                response.status(500).send('Oops! Something went wrong');
            } else {
                
                
                response.status(200).send('Event created successfully');
            }
        })


    // }).catch(error => {

    //     console.log('error in token verification');

    // })

})

module.exports.router = router;