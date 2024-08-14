import * as fs from "fs";

function findFiles(
  directory: string,
  h: string = "",
  excludingDir: (string | number)[] = [],
  insertTab: number = 0,
  presentDirectory: string = ""
) {
  if (!fs.existsSync(directory)) {
    return "directory not found";
  }

  const isDirectory: boolean = fs.statSync(directory).isDirectory();

  if (!isDirectory) {
    console.log("\t".repeat(insertTab) + directory);
  } else {
    const directoriesList: string[] = fs.readdirSync(directory);

    directoriesList.forEach((dir) => {
      const directoryFullPath: string = `${directory}/${dir}`;
      const isDirFile: boolean = fs.statSync(directoryFullPath).isFile();

      if (!presentDirectory) {
        presentDirectory = directoryFullPath;
      }

      const increaseTab: number = countTab(presentDirectory, directoryFullPath);
      presentDirectory = directoryFullPath;
      insertTab += increaseTab;

      if (isDirFile) {
        findFiles(directoryFullPath, h, excludingDir, insertTab);
      } else {
        if (h) {
          if (h === "h") {
            if (/^\./gi.test(dir)) {
              return;
            }
          }
        }

        if (excludingDir.length > 0) {
          for (let i = 0; i < excludingDir.length; i++) {
            if (dir === excludingDir[i]) {
              return;
            }
          }
        }

        console.log("\t".repeat(insertTab) + directoryFullPath);
        findFiles(
          directoryFullPath,
          h,
          excludingDir,
          insertTab,
          presentDirectory
        );
      }
    });
  }

  return "file listing completed";
}

function countTab(previousDir: string, presentDir: string): number {
  let countBackSlashInPrevDir: number = 0;
  let countbackSlashInPresDir: number = 0;

  for (let i = 0; i < previousDir.length; i++) {
    if (previousDir[i] === "/") {
      countBackSlashInPrevDir++;
    }
  }

  for (let i = 0; i < presentDir.length; i++) {
    if (presentDir[i] === "/") {
      countbackSlashInPresDir++;
    }
  }

  if (countbackSlashInPresDir - countBackSlashInPrevDir >= 1) {
    return 1;
  } else if (countbackSlashInPresDir - countBackSlashInPrevDir === 0) {
    return 0;
  } else {
    return -1;
  }
}

console.log(
  findFiles(
    "/home/aditya/Documents/program",
    "h",
    ["node_modules"],
    0
  )
);
