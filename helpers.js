var fs = require('fs');
var path = require('path');


module.exports = function Helpers(config) {
    var createDirectory = function () {
        fs.mkdirSync(config.projectLocation);
    }

    var createGitIgnore = function () {
        fs.readFile(path.join(__dirname, "templates", "gitignore.txt"), function (err, contents) {
            fs.writeFile(path.join(config.projectLocation, ".gitignore"), contents, function (err) {
                if (err) throw new Error(err);
            });
        });
    }

    var createPackageJson = function () {
        var buffer = fs.readFileSync(path.join(config.cwd, "templates", "package.txt"));
        var content = buffer.toString();
        var transpiledContent = content.replace('"name": "express-api-generator",', '"name": "' + config.projectName + '",');
        fs.writeFileSync(path.join(config.projectLocation, "package.json"), transpiledContent);
    }

    var createProject = function () {
        createDirectory();
        createGitIgnore();
        createPackageJson();
    }

    return {
        createProject: createProject
    }
};