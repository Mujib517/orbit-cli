'use strcit';

var ncp = require('ncp');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');


module.exports = function Project(config) {
    var createDirectory = function () {
        fs.mkdirSync(config.projectLocation);
    };

    var createPackageJson = function () {
        var buffer = fs.readFileSync(path.join(config.cwd, "templates", "package.json"));
        var content = buffer.toString();
        var transpiledContent = content.replace('"name": "express-api-generator",', '"name": "' + config.projectName + '",');
        fs.writeFileSync(path.join(config.projectLocation, "package.json"), transpiledContent);
    };

    var copyContents = function () {
        var src = path.join(config.cwd, "templates");

        ncp(src, config.projectLocation, function (err) {
            if (!err) {
                console.log("Project Created.");
            }
        });
    };

    //runs npm install command
    var installDepepdencies = function () {
        shell.exec("cd " + config.projectName + " && npm install", function (err) {
            if (err) {
                console.log("npm install failed. Please run npm install manually to install dependencies");
            }
        });
    };

    var createProject = function () {
        createDirectory();
        copyContents();
        createPackageJson();
        installDepepdencies();
    };

    return {
        createProject: createProject
    }
};