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
const grabToken = require('../common/grabToken');

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
// no token check for login, signup
var authRouter = express.Router();
app.use('/api', authRouter);
AuthenticRoute.init(authRouter);


// token check for dashboard students or teacher
var secureApi = express.Router();
app.use('/secureApi',[checkToken, roleIdCheck], secureApi);
DashboardRoute.init(secureApi);


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

var ApiConfig = {
    app: app,
};

function roleIdCheck(req,res,next) {
    console.log("hello");
    next();
}

// function loginRedirector(req, res, next) {
//     const token = grabToken(req);
//     jwt.verify(token, 'my_secret_key', (err, decode) => {
//         if (err) {
//             next();
//         } else {
            
//             console.log(req.path)
//             switch(req.path){
//                 case "/dashboard/student":
//                 case "/dashboard/teacher":
//                     res.redirect(req.path);
//                     break;
//                 default:
//                     next();
//                     break;
//             }
//         }
//     });
// }
module.exports = ApiConfig;
