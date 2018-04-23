'use strict';

var path = require("path");
var fs = require("fs");
var location = path.resolve('./');

function isValidProjectDirectory() {
    var indexFile = path.join(location, "index.js");
    return fs.existsSync(indexFile);
}

function createDirectory() {
    var routesDirectory = path.join(__dirname, "routes");
    if (!fs.existsSync(routesDirectory)) fs.mkdirSync(routesDirectory);
}

function createRouteFile(fileName) {
    var routerFile = path.join(location, "routes", fileName + ".router.js");
    if (!fs.existsSync(routerFile)) {
        var content = prepareContent();
        fs.writeFileSync(routerFile, content);
    }
    else
        throw new Error(fileName + ".router.js already exists");
}

function prepareContent() {
    var routeTemplatePath = path.join(__dirname, "route-template.txt");
    var buffer = fs.readFileSync(routeTemplatePath);
    return buffer.toString();
}

function updateIndex(fileName) {
    var indexFile = path.join(location, "index.js");
    var buffer = fs.readFileSync(indexFile);
    var routerAlias = fileName + "Router";
    var content = "var " + routerAlias + " = require('./routes/" + fileName + ".router.js');";
    content += "\n";
    fs.writeFileSync(indexFile, content);
    content = "\n";
    fs.appendFileSync(indexFile, buffer);

    content += "app.use('/api/" + fileName + "'," + routerAlias + ");";
    fs.appendFileSync(indexFile, content);
}

function resetConsole() {
    console.log("\x1b[0m");
}

module.exports = {
    createRoute: function (fileName) {
        if (!isValidProjectDirectory) throw new Error("Not a valid Orbit project");
        createDirectory();
        createRouteFile(fileName);
        console.log("\x1b[32m", "Created " + fileName + ".router.js");
        updateIndex(fileName);
        console.log("\x1b[33m", "Updated index.js");
        resetConsole();
    }
};