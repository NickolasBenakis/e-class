var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

const teacherModel = {
    getTeacherLesson: getTeacherLesson,
    getAllStudentsPerLesson: getAllStudentsPerLesson,
};

function getTeacherLesson(teacher_name) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT name FROM teacher_lesson WHERE teacher_name = ?',
            teacher_name,
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

function getAllStudentsPerLesson(lesson_name) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM student_lesson WHERE name = ?',
            lesson_name,
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

module.exports = teacherModel;
