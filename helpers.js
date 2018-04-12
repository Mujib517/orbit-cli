'use strcit';

var fs = require('fs');
var path = require('path');


module.exports = function Helpers(config) {
    var createDirectory = function () {
        fs.mkdirSync(config.projectLocation);
    };

    var createPackageJson = function () {
        var buffer = fs.readFileSync(path.join(config.cwd, "templates", "package.json"));
        var content = buffer.toString();
        var transpiledContent = content.replace('"name": "express-api-generator",', '"name": "' + config.projectName + '",');
        fs.writeFileSync(path.join(config.projectLocation, "package.json"), transpiledContent);
    };

    var createProject = function () {
        createDirectory();
        createFile(config.projectLocation, ".gitignore");
        createFile(config.projectLocation, "index.js");
        createPackageJson();
    };

    var createFile = function (location, fileName) {
        var contents = fs.readFileSync(path.join(__dirname, "templates", fileName));
        fs.writeFileSync(path.join(config.projectLocation, fileName), contents);
    }
    return {
        createProject: createProject
    }
};