[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/NickolasBenakis/e-class.svg?branch=master)](https://travis-ci.org/NickolasBenakis/e-class)

# e-class secure application

A simple and structured secure application written in Node with MySQL, equipped with MVC layer model focused at security practices with basic validation of schema and common error handler, authentication. Deployed in Heroku PaaS https://nben-eclass-unipi.herokuapp.com/api/login

# Security practices
* `Credentials` <br/> <br/>
When admin sign up a user through signup route - `http://localhost:9890/api/signup` ,the user password is being salted and hashed 10 rounds by bcrypt algorithm. The database does not save any plain text password.

* `DATABASE CRUD actions` <br/> <br/>
There is a proper sanitization in database through prepared statements. 

* `Cookies/Tokens` <br/> <br/>
When the user logs in with success, then our api generates a JsonWebToken based on user `username`. Token is send to client via cookies with security attributes `http-only`, `secure`. After that the user is being redirected in a `secureApi/` route where there are sub-routes like `secureApi/dashboard/student` or `secureApi/dashboard/teacher`. There is a middleware in the `secureApi` route which checks everytime for the token , if token and role id is not correct then teacher cannot access a student route or vice versa. In addition if an unsigned in user try to access any of the routes server returns a proper error status informing the user of unauthorized access.

# Story Journey

This Application is an modern secure e-class application. The client can login as a Student or Teacher. Those two roles are bind by a decrete roleId. 

* RoleId = `1` => Student
* RoleId = `2` => Teacher

Every Student has many lessons, grades.
Every Teacher has one lesson, many students.

- Given a student logged in, he checks all his lessons , grades.
- Given a teacher logged in, he checks all the students with their grades that are enrolled in his unique lesson. 
Furthermore he can update each student's grade.

Both of users can log out or will when the Token expires.

# Users to test
| username | password |
| ------ | ------ |
| unipiTeacher | unipi |
| unipiTeacher1 | unipi |
| unipiTeacher2 | unipi |
| unipiTeacher3 | unipi |
| unipiTeacher4 | unipi |
| unipiStudent | unipi |
| unipiStudent1 | unipi |
| unipiStudent2 | unipi |
| unipiStudent3 | unipi |
| unipiStudent4 | unipi |




# Overview 

This Application has a basic CRUD operation with MySQL, authetication of API endpoint with JWT Token and Validation of request and response of each route. It contained a documentation folder which contain sql-scripts for easy db schema creation. It provides security in all possible layers including ( Prepared Statements, JWT Tokens, bcrypt encryption for secure passwords, secure httpOnly Cookies, Validations accross all layers including frontend-backend-database, proper Redirections, secure api routes).

# PreRequisite

-   xampp/lampp/wampp application to run MySQL database and Apache server [Download from here](https://www.apachefriends.org/download.html).
-   Download Node js and install in your operating system. [Download from here](https://nodejs.org/en/download/)
-   Postman a desktop app or you can use it [chrome extension](https://chrome.google.com/webstore/category/extensions) for API testing.[Download from here](https://www.getpostman.com/apps)

---

# Schema Creation In DB

1. Create the db schema. Details can be found in sql-scripts at [here](https://github.com/NickolasBenakis/e-class/tree/master/documents/sql-script/ExportPatsakis).
2. you can also try creating your own db, schema and tables as well just need to change query and table name in model section.

# Get Started

1. `$ git clone https://github.com/NickolasBenakis/e-class`
2. `$ npm install`
3. Launch Enviornment:
    - `$ node app.js or nodemon app.js`
4. In Debug Mode:
    - `$ npm run debug`
5. Open in browser:
    - open `http://localhost:9890`

# API Usage

1. signup route - `http://localhost:9890/api/signup`
    - pass json object contain username, password, roleId.
2. login route - `http://localhost:9890/api/login`
    - pass json object contain username and password.
3. other crud routes are in secureApi - `localhost:9890/secureApi/*`.
    - In all GET, PUT, DELETE and POST request pass `token` in header which you get in login response.
4. signout route - `http://localhost:9890/api/signOut`
    - removes tokens, clears cookies, redirect to `/api/login`

Example object for login request (body as JSON object) -

```
{
    "username":"test",
    "password":"testpass"
}
```

For signup -

```
{
    "username":"test",
    "password":"testpass",
    "roleId" : "1"
}

```

Note: You have to pass `token` for each request as header which youi will get in login response.

# Features

-   To perform basic operation all `Create`, `Fetch`, `Delete` and `Update` functionality.
-   Used Express framework to obtain required operations.
-   Used Express router to route endpoint path.
-   Used JWT Token for security and authentication of API.
-   MVC structure in which `Route`, `Service` and `Model` layer.
-   Used AJV as schema validator which validate request and response schema.
-   Used Connection Pooling which lead to reduce number of conncetion at any point of time and reduce stress in DB which leads to better availability and Performance of DB.
-   Used common error structure format for all type of error throwing in Application.
-   Includes `documents` folder which contain sql scripts for DB schema creation.
-   `bcrypt` is used to encrypt your password through salt and hashing technique and which won't store password as plain text in database.

# References

- Unit testing [Jest](https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)
