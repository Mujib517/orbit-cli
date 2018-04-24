module.exports = function showHelp() {
    console.log("n, new \t\t\t", "To create a new project.\t Usage: orbit new project-name");
    console.log("r, route \t\t", "To create a new router file.\t Usage: orbit route route-name");
    console.log("mw, middleware \t\t", "To create a new middleware.\t Usage: orbit middleware middleware-name");
    console.log("m, model \t\t", "To create a new model.\t Usage: orbit model model-name");
    console.log("c, ctrl \t\t", "To create a new controller.\t Usage: orbit ctrl ctrl-name");
    console.log("c -f,ctrl --function\t", "To create a controller function Usage: orbit ctrl ctrl-name --function");
    console.log("c -c,ctrl --class \t", "To create a controller class Usage: orbit ctrl ctrl-name --class");
    console.log("c -m,ctrl --module \t", "To create a controller function using module pattern Usage: orbit ctrl ctrl-name --module");
    console.log("help, --help \t\t", "To get help.\t Usage: orbit help");
}