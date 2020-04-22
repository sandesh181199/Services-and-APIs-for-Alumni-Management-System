const express = require('express');
const config = require('./src/config');

var app = express();
app.use(express.json());

// Middleware to enable CORS
var cors = require('cors');
app.use(cors());

/*
Routers
*/
var src = require('./src/index');
app.use('/', src.router);

app.listen(config.PORT, () => console.log(`> Port : ${config.PORT}`));