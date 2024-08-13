import * as fs from "fs";

function findFiles(
  directory: string,
  h: string = "",
  excludingDir: (string | number)[] = [],
  countTab: number = 0
) {
  if (!fs.existsSync(directory)) {
    return "directory not found";
  }

  const isDirectory: boolean = fs.statSync(directory).isDirectory();

  if (!isDirectory) {
    console.log(directory) 
  } else {
  
    const directoriesList: string[] = fs.readdirSync(directory);

    const selectedDirectories: string[] = directoriesList.filter((dir) => {
      const directoryFullPath: string = `${directory}/${dir}`;
      const isDirFile = fs.statSync(directoryFullPath).isFile();

      if (isDirFile) {
        findFiles(directoryFullPath, h, excludingDir, countTab);
      } else {
        let dirToDisplay: boolean = true;
        if (h) {
          if (h === "h") {
            const dirHiddenStatus: boolean = /^\./gi.test(dir);
            if (dirHiddenStatus) {
              dirToDisplay = false
            }
          }
        }

        if (excludingDir.length > 0) {
          for (let i = 0; i < excludingDir.length; i++) {
            if (dir === excludingDir[i]) {
              dirToDisplay = false;
            }
          }
          
          if (dirToDisplay) {
            findFiles(directoryFullPath, h, excludingDir, countTab)
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

console.log(
  findFiles("/home/aditya/Documents/program/", "h", ["node_modules"], 0)
);
