const config = require('./config');

const $withPrefix = (path) => {
  if (typeof path !== 'string') {
    return config.publicPath;
  }
  if (!path.startsWith('/')) {
    return '/' + path;
  }
  return config.publicPath + path;
}

module.exports = {
  $withPrefix
}
