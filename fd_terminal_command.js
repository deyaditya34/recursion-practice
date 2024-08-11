"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function findFiles(directory) {
    var readDir = fs.readdirSync(directory);
    console.log(readDir);
}
findFiles("/home/aditya/Documents/NoSQLBooster");
