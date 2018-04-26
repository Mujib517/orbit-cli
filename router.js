'use strict';

var path = require("path");
var fs = require("fs");
var location = path.resolve('./');
var helpers = require('./helpers');

function createRouteFile(name) {
    var routerFile = path.join(location, "routes", helpers.toCamelCase(name) + ".router.js");
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

function updateIndexFile(name) {
    name = helpers.toCamelCase(helpers.removeDashes(name));
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

module.exports = {
    createRoute: function (name) {
        if (!helpers.isValidProjectDirectory) throw new Error("Not a valid Orbit project");
        helpers.createDirectory("routes");
        createRouteFile(name);
        console.log("\x1b[32m", "Created " + helpers.toCamelCase(name) + ".router.js");
        updateIndexFile(name);
        console.log("\x1b[33m", "Updated index.js");
        helpers.resetConsoleColor();
    }
};