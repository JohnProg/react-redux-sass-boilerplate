const path = require('path');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  appIndexJs: resolvePath('src/js/index.jsx'),
  appContext: resolvePath('src'),
  appDist: resolvePath('dist'),
  appSrc: resolvePath('src/js'),
};
