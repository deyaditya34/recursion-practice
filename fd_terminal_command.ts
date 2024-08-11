import * as fs from "fs"

function findFiles(directory: string) {
  const readDir = fs.readdirSync(directory);
  
  console.log(readDir)
}

findFiles("/home/aditya/Documents/NoSQLBooster")