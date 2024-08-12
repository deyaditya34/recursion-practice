import * as fs from "fs";

function findFiles(directory: string) {
  if (!fs.existsSync(directory)) {
    return "directory not found";
  }

  const isDirectory: boolean = fs.statSync(directory).isDirectory();

  if (!isDirectory) {
    console.log(pathbeautify(directory));
  }

  if (isDirectory) {
    const directoriesList: string[] = fs.readdirSync(directory);
    const selectedDirectories: string[] = directoriesList.filter(
      (dir) => (!/^\./gi.test(dir) || !/node_modules/.test(dir))
    );

    for (let i = 0; i < selectedDirectories.length; i++) {
      const newDirectory: string = directory + `/${selectedDirectories[i]}`;
      findFiles(newDirectory);
    }
  }

  return "file listing completed";
}

function pathbeautify(path: string): string {
  let result = "";

  for (let i = 1; i < path.length; i++) {
    if (path[i] === "/") {
      result += "--";
    } else {
      result += path[i];
    }
  }

  return result;
}

console.log(findFiles("/Users/adityadey/Documents/program/"));
