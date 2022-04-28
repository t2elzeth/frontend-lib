import copy from "rollup-plugin-copy";

const path = require("path");
const {defineConfig} = require("vite");

function getCopyOptionsForSubpackage(subpackageName) {
  return {
    src: "package.dist.json",
    dest: `./dist/${subpackageName}`,
    transform: (contents) => contents.toString().replace("__SUBPATH__", subpackageName),
    rename: "package.json"
  };
}

module.exports = defineConfig({
  plugins: [
    copy({
      targets: [
        {src: "./package.json", dest: "./dist"},
        getCopyOptionsForSubpackage("components"),
        getCopyOptionsForSubpackage("constants"),
        getCopyOptionsForSubpackage("hooks"),
        getCopyOptionsForSubpackage("utils")
      ],
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
      name: "FrontendLib",
      fileName: (format) => `frontend-lib.${format}.js`,
      formats: ["esm", "cjs"]
    },
    rollupOptions: {
      input: {
        components: path.resolve(__dirname, "src/components/index.js"),
        constants: path.resolve(__dirname, "src/constants/index.js"),
        hooks: path.resolve(__dirname, "src/hooks/index.js"),
        utils: path.resolve(__dirname, "src/utils/index.js"),
      },
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        entryFileNames: ({name}) => name === "index.js" ? "index.js" : "[name]/index.[format].js"
      },
    },
  }
});