import { readFile, writeFile, stat } from "fs/promises";
import glob from "fast-glob";
import purgecss from "@fullhuman/postcss-purgecss";
import postcss from "postcss";

const sourceFiles = await glob(
  ["./output/**/*.html", "./output/**/*.vue", "./output/**/*.js"],
  {
    dot: true,
    cwd: process.cwd(),
    onlyFiles: true,
    absolute: true,
  }
);

const cssFiles = await glob(["./.output/**/*.css"], {
  dot: true,
  cwd: process.cwd(),
  onlyFiles: true,
  absolute: true,
});

const postcssProcessor = postcss([
  purgecss({
    content: sourceFiles,
  }),
]);

await Promise.all([
  ...cssFiles.map(async (cssFile) => {
    const cssString = await readFile(cssFile, "utf8");
    const { css, map } = await postcssProcessor.process(cssString, {
      from: cssFile,
      to: cssFile,
      map: true,
    });
    await writeFile(cssFile, css);
    if (map !== undefined) {
      await writeFile(cssFile.replace(/\.css$/, ".css.map"), map.toString());
    }
  }),
]);
