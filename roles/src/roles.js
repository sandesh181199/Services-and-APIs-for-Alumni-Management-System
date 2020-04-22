const express = require('express');
const config = require('./config');
var router = express.Router();


router.post('/roles', (request, response) => {
    var sql = `SELECT * 
                FROM 
                    roles_map
                WHERE
                    user_id ="${request.body.userid} " AND
                    active = 1`
    config.CONNECTION.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            response.status(500).json({ message: "Error Connecting to /roles" });
            return;
        } else {
            var roles = [];
            for (let index = 0; index < result.length; index++) {
                roles.push(result[index].role_id);
            }
            response.json(roles);
        }
    })
})

module.exports.router = router;