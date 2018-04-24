module.exports = function showHelp() {
    console.log("n, new \t\t", "To create a new project.\t Usage: orbit new project-name");
    console.log("r, route \t\t", "To create a new router file.\t Usage: orbit route route-name");
    console.log("mw, middleware \t\t", "To create a new middleware.\t Usage: orbit middleware middleware-name");
    console.log("m, model \t\t", "To create a new model.\t Usage: orbit model model-name");
    console.log("help, --help \t\t", "To get help.\t Usage: orbit help");
}