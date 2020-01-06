var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

const studentModel = {
    getAllLessons: getAllLessons,
};

function getAllLessons(student_name) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM student_lesson WHERE student_name = ?',
            student_name,
            (error, rows, fields) => {
                if (!!error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else {
                    dbFunc.connectionRelease;
                    resolve(rows);
                }
            }
        );
    });
}

module.exports = studentModel;
