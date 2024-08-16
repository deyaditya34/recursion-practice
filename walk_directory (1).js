const fs = require("fs")
const path = require("path")

function walk_directory_recursive(dir, options) {
  if (options.max_depth == 0) {
    return;
  }

  const is_excluded = options.exclude_patterns.find(pattern => pattern.test(dir))
  if (is_excluded) {
    return;
  }

  console.log(`${options.output_prefix}${dir}`)

  const lstat = fs.lstatSync(dir)
  if (lstat.isDirectory()) {
    const items_in_dir = fs.readdirSync(dir)

    for (let i = 0; i < items_in_dir.length; i++) {
      walk_directory_recursive(
        path.join(dir, items_in_dir[i]),
        {
          output_prefix: options.output_prefix + "\t",
          exclude_patterns: options.exclude_patterns,
          max_depth: options.max_depth - 1
        }
      )
    }
  }
}

function walk_directory(dir, exclude_patterns, max_depth) {
  const lstat = fs.lstatSync(dir)

  if (!lstat.isDirectory()) {
    throw new Error("NOT_A_DIR")
  }

  const items_in_dir = fs.readdirSync(dir);
  for (let i = 0; i < items_in_dir.length; i++) {
    walk_directory_recursive(
      path.join(dir, items_in_dir[i]),
      {
        output_prefix: "",
        exclude_patterns,
        max_depth
      },
    );
  }
}

const base_directory = process.env.BASE_DIRECTORY || "."
const exclude_patterns = process.argv.slice(2).map(pattern => new RegExp(pattern))

walk_directory(base_directory, exclude_patterns, process.env.MAX_DEPTH || -1)
