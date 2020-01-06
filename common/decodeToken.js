const jwt = require('jsonwebtoken');

function decodeToken(req) {
    let token = req.headers && req.headers.cookie;
    token = token.replace('token=', '');

    const { username } = jwt.decode(token);
    return username;
}

module.exports = decodeToken;
