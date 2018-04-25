'use strict';
var path = require('path');
var fs = require('fs');
var location = path.resolve('./');

function createDirectory() {
    var directoryPath = path.join(location, "controllers");
    if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);
}

function createFile(name, type) {
    var filePath = path.join(location, "controllers", toCamelCase(name) + ".controller.js");
    if (fs.existsSync(filePath)) throw new Error("Controller already exists");
    var content = getContent(name, type);
    fs.writeFileSync(filePath, content);
}

function toCamelCase(name) {
    if (name.length > 0) {
        return name[0].toLowerCase() + name.substr(1, name.length);
    }
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

function resetConsoleColor() {
    console.log("\x1b[0m");
}

module.exports = {

    create: function (name, type) {
        createDirectory(name);
        createFile(name, type);
        console.log("\x1b[32m", "Created " + toCamelCase(name) + ".controller.js");
        resetConsoleColor();
    }
};