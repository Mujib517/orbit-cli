#! /usr/bin/env node

var path = require('path');

if (process.argv.length < 3) {
    console.error('Missing parameters. Command should be "orbit new project-name" ');
    return;
}

var command = process.argv[2];

switch (command.toLowerCase()) {
    case 'new':
    case 'n':
        var projectName = process.argv[3];
        if (!projectName) {
            console.error('Missing parameters. Command should be "orbit new project-name" ');
            return;
        }
        var location = path.resolve('./');
        var projectLocation = path.join(location, projectName);

        var config = {
            cwd: path.dirname(process.argv[1]),
            projectLocation: projectLocation,
            projectName: projectName,
        };
        var project = require('./project')(config);
        project.createProject();
        break;

    case 'route':
    case 'r':
        var name = process.argv[3];
        if (!name) {
            console.error('Missing parameters. Command should be "orbit route route-name" ');
            return;
        }
        var router = require('./router');
        router.createRoute(name);
        break;
    case 'middleware':
    case 'mw':
        var name = process.argv[3];
        if (!name) {
            console.error('Missing parameters. Command should be "orbit middleware middleware-name" ');
            return;
        }
        var middleware = require('./middleware');
        middleware.create(name);
        break;
        break;
    case 'help':
    case '--help':
        var showHelp = require('./help');
        showHelp();
        break;
    default:
        console.error('Unknown option. Command should be "orbit new project-name" ');
        break;
}
