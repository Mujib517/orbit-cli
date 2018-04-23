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

function updateIndex() {

}

module.exports = {
    createRoute: function (fileName) {
        if (!isValidProjectDirectory) throw new Error("Not a valid Orbit project");
        createDirectory();
        createRouteFile(fileName);
        console.log("Created " + fileName + ".router.js");
        updateIndex();
        console.log("Updated index.js");
    }
}