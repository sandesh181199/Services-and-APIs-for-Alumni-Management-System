var mysql = require('mysql');

let PORT = 3000;

var connection = mysql.createConnection({
    host: 'database',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});

module.exports.PORT = PORT;
module.exports.CONNECTION = connection;