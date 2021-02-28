const { webpack: zeniaWebpack } = require('@zenia-ai/common');
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('lodash/merge');
const path = require('path');

module.exports = function (webpackEnv = {}, argv = {}) {
  const projectDir = path.resolve(__dirname);

  const commonConfig = zeniaWebpack.webpackConfig({
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
        {
          from: path.resolve(projectDir, 'dist-worker', 'model'),
          to: 'model',
        },
        {
          from: path.resolve(projectDir, '..', '..', 'html', 'model'),
          to: 'model',
          filter(resourcePath) {
            if (/\.js$/.test(resourcePath) ||/\.js\.map$/.test(resourcePath)) {
              return false;
            }
            return true;
          },
        },
      ],
    }),
  );

  return config;
};
