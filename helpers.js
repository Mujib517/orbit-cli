var path = require('path');
var fs = require('fs');
var location = path.resolve('./');

module.exports = {
    createDirectory: function (dirName) {
        var directoryPath = path.join(location, dirName);
        if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);
    },

    isValidProjectDirectory: function () {
        var indexFile = path.join(location, "index.js");
        var bool = fs.existsSync(indexFile);
        return bool;
    },

    toCamelCase: function (name) {
        if (name.length > 0) {
            return name[0].toLowerCase() + name.substr(1, name.length);
        }
    },

    removeDashes: function (name) {
        return name.replace("-", "");
    },

    resetConsoleColor: function () {
        console.log("\x1b[0m");
    },

    toTitleCase: function (name) {
        if (name.length > 0) {
            return name[0].toUpperCase() + name.substr(1, name.length);
        }
    }
}