const webpack = require("webpack");
const { join } = require("path");
const serverEntry = process.env.SERVER_JS_ENTRY
const clientEntry = process.env.CLIENT_JS_ENTRY
const outputDir = process.env.JS_OUTPUT_DIR

const babelConfig = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        "babel-preset-env",
        "babel-preset-react",
        "babel-preset-stage-2"
      ]
    }
  }
};

const definePlugin = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
});

const webpackModule = {
  rules: [babelConfig]
};

const plugins = [definePlugin];

const resolve = {
  extensions: [".js"]
};

const output = filename => ({
  path: join(process.cwd(), outputDir),
  publicPath: "/",
  filename: filename
});

const clientConfig = {
  entry: join(process.cwd(), clientEntry),
  mode: process.env.NODE_ENV,
  module: webpackModule,
  output: output(process.env.CLIENT_JS_OUTPUT_FILENAME),
  plugins,
  resolve
};

const serverConfig = {
  entry: join(process.cwd(), ),
  mode: process.env.NODE_ENV,
  module: webpackModule,
  output: output(process.env.SERVER_JS_OUTPUT_FILENAME),
  plugins,
  resolve,
  target: "node"
};

let webpackConfigExports = []
if (serverEntry) webpackConfigExports.push(serverConfig)
if (clientEntry) webpackConfigExports.push(clientConfig)
module.exports = webpackConfigExports
