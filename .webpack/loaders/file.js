module.exports = {
  client() {
    return [
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[contenthash].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[contenthash].[ext]',
          esModule: false,
        },
      },
    ];
  },
};
