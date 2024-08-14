"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function findFiles(directory, h, excludingDir, insertTab, presentDirectory) {
    if (h === void 0) { h = ""; }
    if (excludingDir === void 0) { excludingDir = []; }
    if (insertTab === void 0) { insertTab = 0; }
    if (presentDirectory === void 0) { presentDirectory = ""; }
    if (!fs.existsSync(directory)) {
        return "directory not found";
    }
    var isDirectory = fs.statSync(directory).isDirectory();
    if (!isDirectory) {
        console.log("\t".repeat(insertTab) + directory);
    }
    else {
        var directoriesList = fs.readdirSync(directory);
        directoriesList.filter(function (dir) {
            var directoryFullPath = "".concat(directory, "/").concat(dir);
            var isDirFile = fs.statSync(directoryFullPath).isFile();
            if (!presentDirectory) {
                presentDirectory = directoryFullPath;
            }
            var increaseTab = countTab(presentDirectory, directoryFullPath);
            presentDirectory = directoryFullPath;
            insertTab += increaseTab;
            if (isDirFile) {
                findFiles(directoryFullPath, h, excludingDir, insertTab);
            }
            else {
                if (h) {
                    if (h === "h") {
                        if (/^\./gi.test(dir)) {
                            return;
                        }
                    }
                }
                if (excludingDir.length > 0) {
                    for (var i = 0; i < excludingDir.length; i++) {
                        if (dir === excludingDir[i]) {
                            return;
                        }
                    }
                }
                console.log("\t".repeat(insertTab) + directoryFullPath);
                findFiles(directoryFullPath, h, excludingDir, insertTab, presentDirectory);
            }
        });
    }
    return "file listing completed";
}
function countTab(previousDir, presentDir) {
    var countBackSlashInPrevDir = 0;
    var countbackSlashInPresDir = 0;
    for (var i = 0; i < previousDir.length; i++) {
        if (previousDir[i] === "/") {
            countBackSlashInPrevDir++;
        }
    }
    for (var i = 0; i < presentDir.length; i++) {
        if (presentDir[i] === "/") {
            countbackSlashInPresDir++;
        }
    }
    if (countbackSlashInPresDir - countBackSlashInPrevDir >= 1) {
        return 1;
    }
    else if (countbackSlashInPresDir - countBackSlashInPrevDir === 0) {
        return 0;
    }
    else {
        return -1;
    }
}
console.log(findFiles("/home/aditya/Documents/program", "h", ["node_modules"], 0));
