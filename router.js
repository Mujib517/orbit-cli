'use strict';

var path = require("path");
var fs = require("fs");
var location = path.resolve('./');

function isValidProjectDirectory() {
    var indexFile = path.join(location, "index.js");
    return fs.existsSync(indexFile);
}

function createDirectory() {
    var routesDirectory = path.join(location, "routes");
    if (!fs.existsSync(routesDirectory)) fs.mkdirSync(routesDirectory);
}

function createRouteFile(name) {
    var routerFile = path.join(location, "routes", name + ".router.js");
    if (!fs.existsSync(routerFile)) {
        var content = prepareContent();
        fs.writeFileSync(routerFile, content);
    }
    else
        throw new Error(name + ".router.js already exists");
}

function prepareContent() {
    var routeTemplatePath = path.join(__dirname, "advanced-templates", "route-template.txt");
    var buffer = fs.readFileSync(routeTemplatePath);
    return buffer.toString();
}

function updateIndex(name) {
    var indexFile = path.join(location, "index.js");
    var buffer = fs.readFileSync(indexFile);
    var routerAlias = name + "Router";
    var content = "var " + routerAlias + " = require('./routes/" + name + ".router.js');";
    content += "\n";
    fs.writeFileSync(indexFile, content);
    content = "\n";
    fs.appendFileSync(indexFile, buffer);

    content += "app.use('/api/" + name + "'," + routerAlias + ");";
    fs.appendFileSync(indexFile, content);
}

function resetConsole() {
    console.log("\x1b[0m");
}

module.exports = {
    createRoute: function (name) {
        if (!isValidProjectDirectory) throw new Error("Not a valid Orbit project");
        createDirectory();
        createRouteFile(name);
        console.log("\x1b[32m", "Created " + name + ".router.js");
        updateIndex(name);
        console.log("\x1b[33m", "Updated index.js");
        resetConsole();
    }
};