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
var authService = require('../app/services/authentic.service');
var errorCode = require('../common/error-code');
var errorMessage = require('../common/error-methods');
var checkToken = require('./secureRoute');

function pathFile(file) {
    return path.join(process.cwd() + file);
}

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
//set static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(pathFile('/node_modules/bootstrap/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var router = express.Router();
app.use('/api', router);
AuthenticRoute.init(router);

var secureApi = express.Router();

//body parser middleware

app.use('/secureApi', secureApi);
secureApi.use(checkToken);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// index route
let errorState = {
    message: '',
};
app.get('/', (req, res) => {
    res.render(pathFile('/app/views/login.ejs'), {
        errorCredentials: errorState.message,
    });
});

app.post('/login', async (req, res) => {
    try {
        let loginRes = await authService.authentic(req.body);
        console.log(loginRes);
        res.redirect('/dashboard');
    } catch (error) {
        errorState.message = error.message;
        res.redirect('/');
    }
});

app.post('/signup', async (req, res) => {
    try {
        let signupProcess = await authService.signup(req.body);
        console.log(signupProcess);
        return res.status(200);
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
