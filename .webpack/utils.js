const path = require('path');

const getPublicPath = () => {
  return process.env.PUBLIC_PATH || '/';
};

const getOutputPath = (projectDir) => {
  const publicPath = getPublicPath();

  return publicPath.match(/\/\//)
    ? path.resolve(projectDir, 'build')
    : path.resolve(projectDir, 'build', publicPath.replace(/^\/|\/$/g, ''));
};

const getOutputPublicPath = () => {
  const publicPath = getPublicPath();

  return publicPath;
};

module.exports = {
  getOutputPath,
  getOutputPublicPath,
};
