const path = require('path');

function pathFile(file) {
    return path.join(process.cwd() + file);
}

module.exports = pathFile;
