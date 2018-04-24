var path = require('path');
var fs = require('fs');
var location = path.resolve('./');

function createDirectory() {
    var directoryPath = path.join(location, "middlewares");
    if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);
}

function createFile(name) {
    var filePath = path.join(location, "middlewares", name + ".middleware.js");
    if (fs.existsSync(filePath)) throw new Error("Middleware already exists");
    var content = getContent();
    fs.writeFileSync(filePath, content);
}

function getContent() {
    var templateFile = path.join(__dirname, "advanced-templates", "middleware.txt");
    return fs.readFileSync(templateFile);
}

module.exports = {

    create: function (name) {
        createDirectory();
        createFile(name);
    }
};