const studentService = require('../services/student.service');
const teacherService = require('../services/teacher.service');

var schema = require('../schema/loginValidationSchema.json');
var userSchema = require('../schema/userValidationSchema.json');
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
const pathFile = require('../../config/pathFile');
const decodeToken = require('../../common/decodeToken');

function init(router) {
    // student route
    router.route('/dashboard/student').get(getAllLessons);
    // teacher route
    router
        .route('/dashboard/teacher')
        .get(getAllStudents)
        .post(addGrade);
}

const getAllLessons = async (req, res) => {
    const username = decodeToken(req);

    try {
        let lessons = await studentService.getAllLessons(username);
        lessons = lessons.map(el => {
            return {
                name: el.name,
                semester: el.semester,
                student_name: el.student_name,
                grade: el.grade,
            };
        });
        console.log(lessons);
        res.render(pathFile('/app/views/dashboard.ejs'), {
            lessons: lessons,
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllStudents = async (req, res) => {
    const teacher_name = decodeToken(req);

    try {
        const lesson = await teacherService.getTeacherLesson(teacher_name);
        console.log(lesson);
    } catch (error) {
        console.log(error);
    }
};
const addGrade = (req, res) => {};

module.exports.init = init;
