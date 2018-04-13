#! /usr/bin/env node

var path = require('path');

if (process.argv.length < 3) {
    throw new Error("Insufficient arguments");
}

var projectName = process.argv[2];
var location = path.resolve('./');
var projectLocation = path.join(location, projectName);

var config = {
    cwd:path.dirname(process.argv[1]),
    projectLocation: projectLocation,
    projectName: projectName,
};

var helpers = require('./helpers')(config);
helpers.createProject();

