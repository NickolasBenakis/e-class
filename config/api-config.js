const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
//var db = require('./database');
//var http = require('http');
// var errorCode = require('../common/error-code');
// var errorMessage = require('../common/error-methods');
const pathFile = require('./pathFile');
const dbfunc = require('./db-function');
const bodyParser = require('body-parser');
const UserRoute = require('../app/routes/user.route');
const AuthenticRoute = require('../app/routes/authentic.route');
const DashboardRoute = require('../app/routes/dashboard.route');
const authService = require('../app/services/authentic.service');
const checkToken = require('./secureRoute');

// set ejs engine;
app.set('view engine', 'ejs');

dbfunc.connectionCheck
    .then(data => {
        console.log('Connected to database: **', data);
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
//set static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(pathFile('/node_modules/bootstrap/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use sub routers
// var router = express.Router();
// app.use('/api', router);
// AuthenticRoute.init(router);
// DashboardRoute.init(router);

var secureApi = express.Router();
app.use('/secureApi', secureApi);
AuthenticRoute.init(secureApi);
DashboardRoute.init(secureApi);
secureApi.use(checkToken);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

var ApiConfig = {
    app: app,
};

module.exports = ApiConfig;
