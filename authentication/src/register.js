const express = require('express');
const config = require('./config');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');

var router = express.Router();


router.post('/register', (request, response) => {
    bcrypt.hash(request.body.password, 8, (error,hash)=>{
        var sql = `INSERT INTO auth VALUES('${uniqid()}','${request.body.username}','${hash}')`

    config.CONNECTION.query(sql, (result, error) => {
        if (error) {
            console.log(error);
            response.status(500).json({ message: "Could not Register" });
            return;
        } else {
            response.status(200).json({ message: "User Registered Successfully!" });
        }
    })
    })
})


module.exports.router = router;