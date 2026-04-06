#!/usr/bin/env node
import prompts from "prompts";
import pico from "picocolors";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { exec, outputFile, pathExists } from "./utils.js";

if (process.argv.includes("--version") || process.argv.includes("-v")) {
  console.log(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: package.json is fine to be outside
    (await import("../package.json", { assert: { type: "json" } })).default
      .version,
  );
  process.exit(0);
}

console.log(pico.cyan("Starting to scaffold new JC project..."));
function parseValidRes(r: { [key: string]: unknown }) {
  if (
    typeof r.name !== "string" ||
    typeof r.description !== "string" ||
    typeof r.usingReact !== "boolean"
  ) {
    console.log(pico.red("Invalid input."));
    process.exit(1);
  }
  return r as { name: string; description: string; usingReact: boolean };
}
const { name, description, usingReact } = parseValidRes(
  await prompts(
    [
      {
        type: "text",
        name: "name",
        message: "What should we call this project?",
        async validate(value) {
          if (
            typeof value !== "string" ||
            !/^(?:@[a-z-]+\/)?[a-z-]+$/u.test(value)
          )
            return "Not a valid package name.";
          if (await pathExists(value)) return "The directory already exists.";
          return true;
        },
      },
      { type: "text", name: "description", message: "Brief description?" },
      { type: "confirm", name: "usingReact", message: "Using React?" },
    ],
    { onCancel: () => process.exit(0) },
  ),
);
const packageJSON = {
  name,
  description,
  version: "0.0.0",
  author: "Joshua Chen <sidachen2003@gmail.com>",
  license: "MIT",
  publishConfig: { access: "public", registry: "https://registry.npmjs.org" },
  repository: {
    type: "git",
    url: `git+https://github.com/jc-verse/${name}.git`,
  },
  bugs: { url: `https://github.com/jc-verse/${name}/issues` },
  homepage: `https://jc-verse.github.io/${name}/`,
  scripts: {
    format: "prettier -w .",
    lint: 'eslint "**/*.{js,ts,jsx,tsx}"',
    spellcheck: 'cspell "**" --no-progress',
    prepare: "husky",
  },
};

async function rReadDir(dir: string): Promise<[string, Buffer][]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const subDir = path.join(dir, dirent.name);
      return dirent.isDirectory()
        ? rReadDir(subDir)
        : [[subDir, await fs.readFile(subDir)] as [string, Buffer]];
    }),
  );
  return files.flat();
}

await fs.mkdir(name);
process.chdir(name);

const templateRoot = fileURLToPath(new URL("../template", import.meta.url));
await Promise.all(
  (await rReadDir(templateRoot)).map(([p, c]) =>
    outputFile(path.relative(templateRoot, p).replace(/^_/u, "."), c),
  ),
);

await Promise.all([
  fs.writeFile("package.json", `${JSON.stringify(packageJSON, null, 2)}\n`),
  fs.writeFile(
    "README.md",
    `# ${name}

${description}

## Installation

## Usage

## APIs
`,
  ),
]);

const dependencies = [
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "cspell",
  "eslint",
  "eslint-config-jc",
  "eslint-plugin-header",
  "eslint-plugin-import-x",
  "husky",
  "lint-staged",
  "prettier",
  "prettier-config-jc",
  "tsconfig-jc",
  "typescript",
];

const eslintRC = {
  extends: usingReact ? ["jc"] : ["jc/base", "jc/import", "jc/typescript"],
  root: true,
};

const tsconfig = {
  extends: "tsconfig-jc",
  compilerOptions: {
    target: "es2020",
    lib: ["esnext", "dom"],
    rootDir: "./src",
    jsx: undefined as string | undefined,
  },
  include: ["src"],
  exclude: ["node_modules"],
};

if (usingReact) {
  dependencies.push(
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
    "eslint-plugin-jsx-a11y",
  );
  eslintRC.extends = ["jc"];
  tsconfig.compilerOptions.jsx = "react";
}

await fs.writeFile(".eslintrc", `${JSON.stringify(eslintRC, null, 2)}\n`);
await fs.writeFile("tsconfig.json", `${JSON.stringify(tsconfig, null, 2)}\n`);

// This often fails. Let's try multiple times.
exec(`bun add -D ${dependencies.sort().join(" ")}`);
exec("git init");
exec("bun prepare");
exec("git add .");
exec("git commit -m 'initial commit'");
