const express = require('express');
const config = require('./config');
var router = express.Router();


router.post('/registered', (request, response) => {


    axios({
        url: `http://token:3000/verify`,
        method: 'POST',
        data: {
            token: request.headers["authorization"]
        }
    }).then((data) => {

         sql = `select student_fname,student_lname from student_college_info where student_registered=1 and
          college_id=(select college_id from college_emp where user_id='${data.user_id}')`
        config.CONNECTION.query(sql, function (error, result) {
       if (error) {
           // query execution failed
           console.log(error)
           response.status(500).send('Oops! Something went wrong');
       } else {
           response.status(200).send(result[0])
       }
   })


    }).catch(error=>{

         if (typeof error.response !== 'undefined') {
             console.log(`${error.response.status} => ${error.response.data}`);
         } else {
             console.log(`${error}`);
         }
         response.status(503).send('can not verify user');



    })


  

})

module.exports.router = router;