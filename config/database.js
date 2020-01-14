const mysql = require('mysql');

const connectionInfo = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'patsakis',
};

const connectionRemoteInfo = {
    connectionLimit: 100,
    host: '134.209.26.148',
    user: 'onasis',
    password: 'root',
    database: 'patsakis',
};

module.exports = mysql.createPool(connectionRemoteInfo);
