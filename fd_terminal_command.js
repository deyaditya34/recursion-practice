"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function findFiles(directory, h, excludingDir, countTab) {
    if (h === void 0) { h = ""; }
    if (excludingDir === void 0) { excludingDir = []; }
    if (countTab === void 0) { countTab = 0; }
    if (!fs.existsSync(directory)) {
        return "directory not found";
    }
    var isDirectory = fs.statSync(directory).isDirectory();
    if (!isDirectory) {
        console.log(directory);
    }
    else {
        var directoriesList = fs.readdirSync(directory);
        var selectedDirectories = directoriesList.filter(function (dir) {
            var directoryFullPath = "".concat(directory, "/").concat(dir);
            var isDirFile = fs.statSync(directoryFullPath).isFile();
            if (isDirFile) {
                findFiles(directoryFullPath, h, excludingDir, countTab);
            }
            else {
                var dirToDisplay = true;
                if (h) {
                    if (h === "h") {
                        var dirHiddenStatus = /^\./gi.test(dir);
                        if (dirHiddenStatus) {
                            dirToDisplay = false;
                        }
                    }
                }
                if (excludingDir.length > 0) {
                    for (var i = 0; i < excludingDir.length; i++) {
                        if (dir === excludingDir[i]) {
                            dirToDisplay = false;
                        }
                    }
                    if (dirToDisplay) {
                        findFiles(directoryFullPath, h, excludingDir, countTab);
                    }
                }
                return true;
            }
        });
        // for (let i = 0; i < selectedDirectories.length; i++) {
        //   const newDirectory: string = `${directory}/${selectedDirectories[i]}`;
        //    findFiles(newDirectory, h, excludingDir, countTab);
        // }
    }
    return "file listing completed";
}
// function countTab(defaultDirectory: string, newDirectory: string): number {
//   let result: number = 0;
//   const defaultDirLength = defaultDirectory.length;
//   for (let i = defaultDirLength; i < newDirectory.length; i++) {
//     if (newDirectory[i] === "/" && newDirectory[i + 1]) {
//       result++;
//     }
//   }
//   return result;
// }
console.log(findFiles("/home/aditya/Documents/program/", "h", ["node_modules"], 0));
