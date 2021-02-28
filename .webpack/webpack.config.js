const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

const { getDefinePluginConfig } = require('./configs');
const loaders = require('./loaders');
const utils = require('./utils');

module.exports = function (options = {}) {
  const isEnvDevelopment = options.mode === 'development';
  const isEnvProduction = options.mode === 'production';

  return {
    output: {
      path: utils.getOutputPath(options.projectDir),
      filename: isEnvProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: utils.getOutputPublicPath(),
    },

    module: {
      rules: [
        ...loaders.js.client(),
        ...loaders.css.client(options.cssLoadersOptions),
        ...loaders.file.client(),
      ],
    },

    devtool: isEnvDevelopment ? 'source-maps' : false,

    devServer: {
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      disableHostCheck: true,
    },

    resolve: {
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },

    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: false,
        }),
      ],
    },

    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {
            templateParameters: {
              PUBLIC_URL: utils.getOutputPublicPath(),
            },
            inject: true,
          },
          isEnvProduction && {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          },
          options.htmlWebpackPluginConfig,
        ),
      ),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }),
      isEnvProduction && new OptimizeCssAssetsPlugin(),
      new DefinePlugin(getDefinePluginConfig(options.projectDir, options.configName)),
    ].filter(Boolean),
  };
};
