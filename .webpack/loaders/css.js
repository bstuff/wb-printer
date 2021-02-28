const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CSS_REGEX = /\.css$/;
const SCSS_REGEX = /\.scss$/;
const CSS_MODULE_REGEX = /\.module\.css$/;

module.exports = {
  client(options = {}) {
    const miniCssLoader = {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: options.cssContextPublicPath,
      },
    };

    return [
      {
        test: CSS_REGEX,
        exclude: CSS_MODULE_REGEX,
        use: [
          miniCssLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: SCSS_REGEX,
        use: [
          miniCssLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: CSS_MODULE_REGEX,
        use: [
          miniCssLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ];
  },
};
