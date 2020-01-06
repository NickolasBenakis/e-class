const studentService = require('../services/student.service');
var schema = require('../schema/loginValidationSchema.json');
var userSchema = require('../schema/userValidationSchema.json');
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
const pathFile = require('../../config/pathFile');
const jwt = require('jsonwebtoken');

function init(router) {
    // student route
    router.route('/dashboard/student').get(getAllLessons);
    // teacher route
    router
        .route('/dashboard/teacher')
        .get(getAllLessons)
        .post(addGrade);
}

const getAllLessons = async (req, res) => {
    let token = req.headers && req.headers.cookie;
    token = token.replace('token=', '');

    const { username } = jwt.decode(token);

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

const addGrade = (req, res) => {};

module.exports.init = init;
