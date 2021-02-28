const CopyPlugin = require('copy-webpack-plugin');
const merge = require('lodash/merge');
const path = require('path');
const { webpackConfig: baseWebpack } = require('./.webpack');

module.exports = function (webpackEnv = {}, argv = {}) {
  const projectDir = path.resolve(__dirname);

  const commonConfig = baseWebpack({
    mode: argv.mode,
    projectDir: path.resolve(projectDir),
    configName: webpackEnv.config,
    htmlWebpackPluginConfig: {
      template: path.resolve(projectDir, 'public', 'index.html'),
      chunks: ['main'],
    },
    cssLoadersOptions: {
      cssContextPublicPath: '..',
    },
  });

  const config = merge(commonConfig, {
    entry: {
      main: [
        //
        path.resolve(projectDir, 'src'),
      ],
    },
  });

  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(projectDir, 'public', 'favicon.ico'),
        },
      ],
    }),
  );

  return config;
};
