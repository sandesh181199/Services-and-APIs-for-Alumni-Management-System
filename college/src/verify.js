const express = require('express');
const config = require('./config');
var router = express.Router();

router.post('/verify',(request,response)=>{
    var sql = `SELECT * FROM auth;
                SELECT * FROM events;`
    config.CONNECTION.query(sql,(error,result)=>{
        if(error){
            console.log(error);
            response.status(503).json({message: "Database connection error"});
            return;
        }else{
            console.log(result);
            response.status(200).json(result);
        }
    })
})

module.exports.router = router;