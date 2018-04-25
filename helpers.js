module.exports = {
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