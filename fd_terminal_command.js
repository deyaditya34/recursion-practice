"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function findFiles(directory) {
    if (!fs.existsSync(directory)) {
        return "directory not found";
    }
    var isDirectory = fs.statSync(directory).isDirectory();
    if (!isDirectory) {
        console.log(pathbeautify(directory));
    }
    if (isDirectory) {
        var directoriesList = fs.readdirSync(directory);
        var selectedDirectories = directoriesList.filter(function (dir) { return (!/^\./gi.test(dir) || !/node_modules/.test(dir)); });
        for (var i = 0; i < selectedDirectories.length; i++) {
            var newDirectory = directory + "/".concat(selectedDirectories[i]);
            findFiles(newDirectory);
        }
    }
    return "file listing completed";
}
function pathbeautify(path) {
    var result = "";
    for (var i = 1; i < path.length; i++) {
        if (path[i] === "/") {
            result += "--";
        }
        else {
            result += path[i];
        }
    }
    return result;
}
// console.log(pathbeautify("/Users/adityadey/Documents/program"));
console.log(findFiles("/Users/adityadey/Documents/program/"));
