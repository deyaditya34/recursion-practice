import * as fs from "fs";
import * as path from "path";

function find_files_recursive(
  dir: string,
  options: {
    max_depth: number;
    exclude_patterns: RegExp[];
    output_prefix: string;
    hide_hidden: boolean;
  },
) {
  if (options.max_depth === 0) {
    return;
  }

  const is_excluded_dir: RegExp | undefined = options.exclude_patterns.find(
    (pattern: RegExp) => pattern.test(dir),
  );
  if (is_excluded_dir) {
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
      exclude_patterns: options.exclude_patterns,
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
  exclude_patterns: RegExp[],
  max_depth: number,
  hide_hidden: boolean = false,
) {
  const dirStat = fs.statSync(dir);

  if (!dirStat.isDirectory()) {
    throw new Error("NOT_A_DIR");
  }

  if (max_depth) {
    max_depth = Number(max_depth);
  }

  const items_in_dir: string[] = fs.readdirSync(dir);
  for (let i = 0; i < items_in_dir.length; i++) {
    find_files_recursive(path.join(dir, items_in_dir[i]), {
      max_depth,
      exclude_patterns,
      output_prefix: "",
      hide_hidden
    });
  }
}

const base_directory = process.env.BASE_DIRECTORY || ".";

const exclude_patterns = process.argv
  .slice(2)
  .map((pattern) => new RegExp(pattern));

const max_depth = Number(process.env.MAX_DEPTH) || -1;

let hide_hidden: boolean = false;
if (process.env.HIDE_HIDDEN === "true") {
  hide_hidden = true;
}

find_files(base_directory, exclude_patterns, max_depth, hide_hidden);
