import path from "path";
import {defineConfig} from "vite";
import copy from "rollup-plugin-copy";

const subpackages = [
  "components",
  "constants",
  "hooks",
  "utils"
];

const libraryName = "frontend-lib";
const subpackagePackageJson = "subpackage.package.json";
const outputDir = "./dist";
const bundleFormats = ["esm", "cjs"];

function getSubpackageCopyTargets() {
  function getTarget(subpackageName) {
    return {
      src: subpackagePackageJson,
      dest: `${outputDir}/${subpackageName}`,
      transform: (contents) => contents.toString().replace("__SUBPATH__", subpackageName),
      rename: "package.json"
    };
  }

  const initialOptions = [
    {src: "./package.json", dest: outputDir}
  ];

  return [
    ...initialOptions,
    ...subpackages.map(getTarget)
  ];
}

function getRollupInputOptions() {
  /*
  *  returns an object in format:
  * {
  *   subpackage1: path.resolve(__dirname, "src/subpackage1/index.js"),
  *   subpackage2: path.resolve(__dirname, "src/subpackage2/index.js"),
  *   subpackage3: path.resolve(__dirname, "src/subpackage3/index.js"),
  * }
  */
  const initialOptions = {
    index: path.resolve(__dirname, "src/index.js")
  };

  return subpackages.reduce((p, n) => {
    p[n] = path.resolve(__dirname, `src/subpackages/${n}/index.js`);
    return p;
  }, initialOptions);
}

function getEntryName({name}) {
  return name === "index.js" ? "index.js" : "[name]/index.[format].js";
}

export default defineConfig({
  plugins: [
    copy({
      targets: getSubpackageCopyTargets(),
      hook: "writeBundle"
    })
  ],
  resolve: {
    alias: [
      {find: "@", replacement: path.resolve("src")},
    ],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      fileName: (format) => `${libraryName}.${format}.js`,
      formats: bundleFormats
    },
    outDir: outputDir,
    rollupOptions: {
      input: getRollupInputOptions(),
      external: ["react", "react-dom"],
      output: {
        entryFileNames: getEntryName
      },
    },
  }
})
;
