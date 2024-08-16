"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function find_files_recursive(dir, options) {
    if (options.max_depth === 0) {
        return;
    }
    var is_excluded_dir = options.exclude_patterns.find(function (pattern) { return pattern.test(dir); });
    if (is_excluded_dir) {
        return;
    }
    if (hidden_stat) {
        if (/^\./gi.test(path.basename(dir))) {
            return;
        }
    }
    console.log("".concat(options.output_prefix).concat(dir));
    var dirStat = fs.statSync(dir);
    if (dirStat.isDirectory()) {
        var items_in_dir = fs.readdirSync(dir);
        var new_options = {
            output_prefix: options.output_prefix + "\t",
            exclude_patterns: options.exclude_patterns,
            max_depth: options.max_depth - 1,
            hidden_stat: hidden_stat,
        };
        for (var i = 0; i < items_in_dir.length; i++) {
            find_files_recursive(path.join(dir, items_in_dir[i]), new_options);
        }
    }
}
function find_files(dir, exclude_patterns, max_depth, hidden_stat) {
    if (hidden_stat === void 0) { hidden_stat = false; }
    var dirStat = fs.statSync(dir);
    if (!dirStat.isDirectory()) {
        throw new Error("NOT_A_DIR");
    }
    if (max_depth) {
        max_depth = Number(max_depth);
    }
    var items_in_dir = fs.readdirSync(dir);
    for (var i = 0; i < items_in_dir.length; i++) {
        find_files_recursive(path.join(dir, items_in_dir[i]), {
            max_depth: max_depth,
            exclude_patterns: exclude_patterns,
            output_prefix: "",
            hidden_stat: hidden_stat,
        });
    }
}
var base_directory = process.env.BASE_DIRECTORY || ".";
var exclude_patterns = process.argv
    .slice(2)
    .map(function (pattern) { return new RegExp(pattern); });
var max_depth = Number(process.env.MAX_DEPTH) || -1;
var hidden_stat;
if (process.env.HIDDEN_STAT === "true") {
    hidden_stat = true;
}
else {
    hidden_stat = false;
}
find_files(base_directory, exclude_patterns, max_depth, hidden_stat);
