const apis = require('./config/api-config');
const db = require('./config/database');

const PORT = 9890;

apis.app.listen(process.env.PORT || PORT, function() {
    console.log('server connected to port ' + PORT);
});

db.query('SELECT * FROM user', function(error, res, fields) {
    if (error) throw error;
    console.log(res);
});
