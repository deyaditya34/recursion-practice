import * as fs from "fs";
import * as path from "path";

function find_files_recursive(
  dir: string,
  options: {
    max_depth: number;
    exclude_regex: RegExp;
    output_prefix: string;
    hide_hidden: boolean;
  },
) {
  if (options.max_depth === 0) {
    return;
  }

  if (options.exclude_regex.test(dir)) {
    return;
  }

  if (options.hide_hidden) {
    if (/^\./gi.test(path.basename(dir))) {
      return;
    }
  }

  console.log(`${options.output_prefix}${dir}`);
  const dirStat = fs.statSync(dir);

  if (dirStat.isDirectory()) {
    const items_in_dir: string[] = fs.readdirSync(dir);
    const new_options = {
      output_prefix: options.output_prefix + "\t",
      exclude_regex: options.exclude_regex,
      max_depth: options.max_depth - 1,
      hide_hidden: options.hide_hidden,
    };

    for (let i = 0; i < items_in_dir.length; i++) {
      find_files_recursive(path.join(dir, items_in_dir[i]), new_options);
    }
  }
}

function find_files(
  dir: string,
  exclude_patterns: string,
  max_depth: number,
  hide_hidden: boolean,
) {
  const dirStat = fs.statSync(dir);

  if (!dirStat.isDirectory()) {
    throw new Error("NOT_A_DIR");
  }

  if (max_depth) {
    max_depth = Number(max_depth);
  }

  const exclude_regex = new RegExp(exclude_patterns_string);

  const items_in_dir: string[] = fs.readdirSync(dir);
  for (let i = 0; i < items_in_dir.length; i++) {
    find_files_recursive(path.join(dir, items_in_dir[i]), {
      max_depth,
      exclude_regex,
      output_prefix: "",
      hide_hidden,
    });
  }
}

const user_data_in_arr = process.argv;

if (/^\-h/gi.test(user_data_in_arr[2])) {
  print_commands();
  process.exit();
}

let base_directory = ".";
if (!/^\-/.test(user_data_in_arr[2])) {
  base_directory = user_data_in_arr[2];
}

const exclude_patterns = user_data_in_arr
  .map((item, i) => {
    if (item === "-e" || item === "--exclude") {
      if (user_data_in_arr[i + 1] && !/^\-/gi.test(user_data_in_arr[i + 1])) {
        return user_data_in_arr[i + 1];
      }
    }
  })
  .filter((item) => item);

let exclude_patterns_string = "";
if (exclude_patterns.length > 0) {
  exclude_patterns.forEach((item, i) => {
    if (exclude_patterns.length - 1 === i) {
      exclude_patterns_string += item;
    } else {
      exclude_patterns_string += item + "|";
    }
  });
} else {
  exclude_patterns_string += "*^";
}

const max_depth = find_max_depth(user_data_in_arr);
function find_max_depth(user_data: string[]): number {
  let result = -1;

  for (let i = 0; i < user_data.length; i++) {
    if (user_data[i] === "-d" || user_data[i] === "--depth") {
      if (Number(user_data[i + 1])) {
        result = Number(user_data[i + 1]);
        break;
      }
    }
  }

  return result;
}

const hide_hidden = hide_hidden_status(user_data_in_arr);
function hide_hidden_status(user_data: string[]): boolean {
  let result = false;

  const hide_hidden_status = user_data.find(
    (item) => item === "-h" || item === "--hidden",
  );

  if (hide_hidden_status) {
    result = true;
  }

  return result;
}

function print_commands() {
  console.log(`usage: find_files <path> [-e | --exclude] [--help] [-d | --depth]`);
  
  console.log(`\t\t by default, the program takes the current directory into account.`);
  console.log(
    `\t\t for custom directory, send the path as the first parameter to the program.\n`,
  );
  console.log(`These are the commands to the program with details :-`);
  console.log(`\t -e | --exclude \t <directory name>`);
  console.log(
    `\t\t Note :- The above command can be used multiple times for directories.`,
  );
  console.log(`\t -d | --depth \t <number>`);
  console.log(`\t\t Note :- The above command expects a number, to do depth searching in a particular directory.`);
  
}

find_files(base_directory, exclude_patterns_string, max_depth, hide_hidden);

