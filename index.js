#!/usr/bin/env node
require("dotenv").config();
const webpack = require("webpack");
const webpackConfig = require("./webpackConfig");
const compiler = webpack(webpackConfig);

const watch = () => {
  const watching = compiler.watch(
    {
      aggregateTimeout: 1000,
      ignored: /node_modules/,
      poll: 1000
    },
    (err, stats) => {
      if (err) console.log(err);
      process.stdout.write(
        stats.toString({
          colors: true
        }) + "\n"
      );
    }
  );

  function exitHandler(options, err) {
    if (err) console.log(err);
    watching.close(() => {
      console.log("Watching Ended.");
    });
  }

  process.on("exit", exitHandler.bind(null, { cleanup: true }));
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
};

const run = () => {
  compiler.run((err, stats) => {
    if (err) console.log(err);
    process.stdout.write(
      stats.toString({
        colors: true
      })
    );
  });
};

const build = () => {
  process.argv.slice(2)[0] === "-w" || process.argv.slice(2)[0] === "--watch"
    ? watch()
    : run();
};

build();
