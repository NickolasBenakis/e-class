const studentModel = require('../models/student.model');

const studentService = {
    getAllLessons: getAllLessons,
};

function getAllLessons(student_name) {
    return new Promise((resolve, reject) => {
        studentModel
            .getAllLessons(student_name)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports = studentService;
