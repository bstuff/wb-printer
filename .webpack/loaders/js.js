module.exports = {
  client() {
    return [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
      },
    ];
  }
};
