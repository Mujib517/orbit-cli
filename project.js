'use strcit';

var ncp = require('ncp');
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');


module.exports = function Project(config) {
    var srcDirName = config.type.toLowerCase() === "mvc" ? "mvc-templates" : "templates";

    var createDirectory = function () {
        fs.mkdirSync(config.projectLocation);
    };

    var createPackageJson = function () {

        var buffer = fs.readFileSync(path.join(config.cwd, srcDirName, "package.json"));
        var content = buffer.toString();
        var transpiledContent = content.replace('express-api-generator', config.projectName);
        fs.writeFileSync(path.join(config.projectLocation, "package.json"), transpiledContent);
    };

    var copyContents = function () {
        var src = path.join(config.cwd, srcDirName);
        ncp(src, config.projectLocation, function (err) {
            if (!err) {
                console.log("Project Created.");
                console.log("Running npm install to install dependencies");
                createPackageJson();
                installDepepdencies();
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
    };

    return {
        createProject: createProject
    }
};