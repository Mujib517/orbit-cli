'use strict';
var path = require('path');
var fs = require('fs');
var location = path.resolve('./');
var helpers = require('./helpers');

function createFile(name, type) {
    var filePath = path.join(location, "controllers", helpers.toCamelCase(name) + ".controller.js");
    if (fs.existsSync(filePath)) throw new Error("Controller already exists");
    var content = getContent(name, type);
    fs.writeFileSync(filePath, content);
}

function getContent(name, type) {
    var templateFileName;
    switch (type) {
        case '--function':
        case '-f':
            templateFileName = "ctrl-function.txt";
            break;
        case '--class':
        case '-c':
            templateFileName = "ctrl-class.txt";
            break;
        case '--module':
        case '-m':
            templateFileName = "ctrl-module.txt";
            break;
        default:
            templateFileName = "ctrl.txt";
            break;
    }
    var templateFile = path.join(__dirname, "advanced-templates", templateFileName);
    var buffer = fs.readFileSync(templateFile);
    return buffer.toString();
}


module.exports = {

    create: function (name, type) {
        if (!helpers.isValidProjectDirectory) throw new Error("Not a valid Orbit project");
        helpers.createDirectory("controllers");
        createFile(name, type);
        console.log("\x1b[32m", "Created " + helpers.toCamelCase(name) + ".controller.js");
        helpers.resetConsoleColor();
    }
};