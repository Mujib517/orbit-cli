#! /usr/bin/env node

var path = require('path');
var os = require('os');

if (process.argv.length < 3) {
    console.error('Missing parameters. Command should be "orbit new project-name" ');
    return;
}

var command = process.argv[2];

switch (command.toLowerCase()) {
    case 'new':
    case 'n':
    case 'mvc':
    case 'api':
        var projectName = process.argv[3];
        if (!projectName) {
            console.error('Missing parameters. Command should be "orbit new project-name" or "orbit mvc project-name" ');
            return;
        }
        var location = path.resolve('./');
        var projectLocation = path.join(location, projectName);

        var config = {
            cwd: os.type().toLowerCase() === 'windows_nt' ? path.dirname(process.argv[1]) : '/usr/lib/node_modules/orbit-cli',
            projectLocation: projectLocation,
            projectName: projectName,
            type: command
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
    case 'model':
    case 'm':
        var name = process.argv[3];
        if (!name) {
            console.error('Missing parameters. Command should be "orbit model model-name" ');
            return;
        }
        var model = require('./model');
        model.create(name);
        break;
    case 'c':
    case 'ctrl':
        var name = process.argv[3];
        if (!name) {
            console.error('Missing parameters. Command should be "orbit ctrl ctrl-name" ');
            return;
        }
        var type = process.argv[4];
        var ctrl = require('./ctrl');
        ctrl.create(name, type);
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
