var path = require('path');
var fs = require('fs');
var location = path.resolve('./');
var helpers = require('./helpers');

function createFile(name) {
    var filePath = path.join(location, "middlewares", helpers.toCamelCase(name) + ".middleware.js");
    if (fs.existsSync(filePath)) throw new Error("Middleware already exists");
    var content = getContent();
    fs.writeFileSync(filePath, content);
}

function getContent() {
    var templateFile = path.join(__dirname, "advanced-templates", "middleware.txt");
    return fs.readFileSync(templateFile);
}

function updateIndexFile(name) {
    name = helpers.toCamelCase(helpers.removeDashes(name));
    var indexFile = path.join(location, "index.js");
    var buffer = fs.readFileSync(indexFile);
    var middlewareAlias = name + "Middleware";
    var content = "var " + middlewareAlias + " = require('./middlewares/" + name + ".middleware.js');";
    content += "\n";
    fs.writeFileSync(indexFile, content);
    content = "\n";
    fs.appendFileSync(indexFile, buffer);

    content += "app.use(" + middlewareAlias + ");";
    fs.appendFileSync(indexFile, content);
}

module.exports = {

    create: function (name) {
        helpers.createDirectory("middlewares");
        createFile(name);
        console.log("\x1b[32m", "Created " + helpers.toCamelCase(name) + ".middleware.js");
        updateIndexFile(name);
        console.log("\x1b[33m", "Updated index.js");
        helpers.resetConsoleColor();
    }
};