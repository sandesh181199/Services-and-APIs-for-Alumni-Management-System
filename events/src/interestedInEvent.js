const express = require('express');
const config = require('./config');
var router = express.Router();

router.post('/events/interested',(request,response)=>{
    var sql =`INSERT INTO events_map (${request.body.evenyid},${request.body.userid},0)`;

    config.CONNECTION.query(sql,(error,result)=>{
        if(error){
            console.log(error);
            response.status(503).json({message: "Error in events/interested"});
            return;
        }else{
            response.sendStatus(200);
        }
    })
})


router.post('/events/going',(request,response)=>{
    var sql =`INSERT INTO events_map (${request.body.evenyid},${request.body.userid},1)`;

    config.CONNECTION.query(sql,(error,result)=>{
        if(error){
            console.log(error);
            response.status(503).json({message: "Error in events/going"});
            return;
        }else{
            response.sendStatus(200);
        }
    })
})
module.exports.router = router;