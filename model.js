
'use strict';

var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var location = path.resolve('./');
var helpers = require('./helpers');

function createFile(name) {
    var filePath = path.join(location, "models", helpers.toCamelCase(name) + ".model.js");
    if (fs.existsSync(filePath)) throw new Error("Model already exists");
    var content = getContent(name);
    fs.writeFileSync(filePath, content);
}

function getContent(name) {
    var templateFile = path.join(__dirname, "advanced-templates", "model.txt");
    var buffer = fs.readFileSync(templateFile);
    var content = buffer.toString();
    var modelName = helpers.toTitleCase(name);
    var transformedContent = content.replace("model_name_place_holder", helpers.removeDashes(modelName));
    return transformedContent;
}

function installMongoose() {
    isMongooseInstalled(function (err) {
        if (err) {
            shell.exec("npm install mongoose --save", function (err) {
                if (err) {
                    console.log("npm install mongoose failed try running manually");
                }
            });
        }
        else {
            console.log("mongoose already installed. Skipping operation");
        }
    });
}

function isMongooseInstalled(done) {
    shell.exec("node -p require('mongoose').version", { silent: true }, done);
}

module.exports = {
    create: function (name) {
        if (!helpers.isValidProjectDirectory) throw new Error("Not a valid Orbit project");
        helpers.createDirectory("models");
        createFile(name);
        console.log("\x1b[32m", "Created " + helpers.toCamelCase(name) + ".model.js");
        console.log("Installing mongoose...");
        helpers.resetConsoleColor();
        installMongoose();
    }
};