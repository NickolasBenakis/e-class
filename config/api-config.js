const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
//var db = require('./database');
//var http = require('http');
// var errorCode = require('../common/error-code');
// var errorMessage = require('../common/error-methods');

const dbfunc = require('./db-function');
const bodyParser = require('body-parser');
const UserRoute = require('../app/routes/user.route');
const AuthenticRoute = require('../app/routes/authentic.route');
const authService = require('../app/services/authentic.service');
const checkToken = require('./secureRoute');

function pathFile(file) {
    return path.join(process.cwd() + file);
}

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
var router = express.Router();
app.use('/api', router);
AuthenticRoute.init(router);

var secureApi = express.Router();
app.use('/secureApi', secureApi);
secureApi.use(checkToken);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// index login route
app.get('/login', (req, res) => {
    res.render(pathFile('/app/views/login.ejs'), {
        errorCredentials: '',
    });
});

app.post('/login', async (req, res) => {
    try {
        let loginRes = await authService.authentic(req.body);
        console.log(loginRes);
        res.redirect('/dashboard');
    } catch (error) {
        res.render(pathFile('/app/views/login.ejs'), {
            errorCredentials: error.message,
        });
    }
});

app.post('/signup', async (req, res) => {
    try {
        let signupProcess = await authService.signup(req.body);
        console.log(signupProcess);
        return res.status(200).send('OK');
    } catch (error) {
        console.log(error);
        return res.status(444).send(error.message);
    }
});

app.get('/dashboard', (req, res) => {
    res.render(pathFile('/app/views/dashboard.ejs'));
});

var ApiConfig = {
    app: app,
};

UserRoute.init(secureApi);

module.exports = ApiConfig;
