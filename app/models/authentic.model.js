var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var authenticModel = {
    authentic: authentic,
    signup: signup,
};

function authentic(authenticData) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM user WHERE username = ?',
            authenticData.username,
            (error, rows, fields) => {
                if (error) {
                    reject(error);
                } else if (!rows.length) {
                    let error = {
                        message: 'Invalid username',
                    };
                    reject(error);
                } else {
                    bcrypt.compare(authenticData.password, rows[0].password, function(
                        err,
                        isMatch
                    ) {
                        if (err) {
                            reject(error);
                        } else if (isMatch) {
                            resolve(rows);
                        } else {
                            reject({ success: false, message: 'wrong credentials' });
                        }
                    });
                }
            }
        );
    });
}

function signup(user) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return err;
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return err;
                }
                user.password = hash;
                db.query(
                    'SELECT * FROM user WHERE username= ?',
                    user.username,
                    (error, rows, fields) => {
                        if (error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else if (rows.length > 0) {
                            dbFunc.connectionRelease;
                            reject({
                                success: false,
                                message: 'user already exist ! try with different user',
                            });
                        } else {
                            db.query(
                                'INSERT INTO user(username,password,roleId)VALUES (?, ? , ?)',
                                [user.username, user.password, user.roleId],
                                (error, rows, fields) => {
                                    if (error) {
                                        dbFunc.connectionRelease;
                                        reject(error);
                                    } else {
                                        dbFunc.connectionRelease;
                                        resolve(rows);
                                    }
                                }
                            );
                        }
                    }
                );
            });
        });
    });
}

module.exports = authenticModel;
