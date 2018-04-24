
'use strict';

var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var location = path.resolve('./');

function createDirectory() {
    var directoryPath = path.join(location, "models");
    if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);
}

function createFile(name) {
    var filePath = path.join(location, "models", name + ".model.js");
    if (fs.existsSync(filePath)) throw new Error("Model already exists");
    var content = getContent(name);
    fs.writeFileSync(filePath, content);
}

function getContent(name) {
    var templateFile = path.join(__dirname, "advanced-templates", "model.txt");
    var buffer = fs.readFileSync(templateFile);
    var content = buffer.toString();
    var transformedContent = content.replace("model_name_place_holder", name);
    return transformedContent;
}

function installMongoose() {
    shell.exec("npm install mongoose --save", function (err) {
        if (err) {
            console.log("npm install mongoose failed try running manually");
        }
    });
}

function resetConsoleColor() {
    console.log("\x1b[0m");
}

module.exports = {
    create: function (name) {
        createDirectory();
        createFile(name);
        console.log("\x1b[32m", "Created " + name + ".model.js");
        console.log("Installing mongoose...");
        resetConsoleColor();
        installMongoose();
    }
};