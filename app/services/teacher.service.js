const teacherModel = require('../models/teacher.model');

const teacherService = {
    getTeacherLesson: getTeacherLesson,
    getAllStudentsPerLesson: getAllStudentsPerLesson,
    addGrade: addGrade,
};

function getTeacherLesson(teacher_name) {
    return new Promise((resolve, reject) => {
        teacherModel
            .getTeacherLesson(teacher_name)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getAllStudentsPerLesson(lesson_name) {
    return new Promise((resolve, reject) => {
        teacherModel
            .getAllStudentsPerLesson(lesson_name)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function addGrade(student_name, grade) {
    return new Promise((resolve, reject) => {
        teacherModel
            .addGrade(student_name, grade)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports = teacherService;
