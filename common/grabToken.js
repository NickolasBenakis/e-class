
function grabToken(req) {
    let token = req.headers && req.headers.cookie;
    token = token.replace('token=', '');
    return token;
}

module.exports = grabToken;
