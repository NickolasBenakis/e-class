var express = require('express');
var app = express();
var path = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var db = require('./database');
var dbfunc = require('./db-function');
var http = require('http');
var bodyParser = require('body-parser');
var UserRoute = require('../app/routes/user.route');
var AuthenticRoute = require('../app/routes/authentic.route');
var errorCode = require('../common/error-code');
var errorMessage = require('../common/error-methods');
var checkToken = require('./secureRoute');

// set ejs engine;
app.set('view engine', 'ejs');

// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('*/1 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

dbfunc.connectionCheck
    .then(data => {
        //console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

var router = express.Router();
app.use('/api', router);
AuthenticRoute.init(router);

var secureApi = express.Router();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use('/secureApi', secureApi);
secureApi.use(checkToken);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(express.static(process.cwd() + '/node_modules/bootstrap/dist'));

// index route
let data = 'hey ho';
app.get('/', (req, res) => {
    //res.sendFile(path.join(process.cwd() + '/app/views/login.ejs'));
    res.render(path.join(process.cwd() + '/app/views/login.ejs'), { data: data });
});

var ApiConfig = {
    app: app,
};

UserRoute.init(secureApi);

module.exports = ApiConfig;
