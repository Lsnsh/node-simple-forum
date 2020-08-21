const config = require('./config');

const $withPrefix = (path) => {
  if (typeof path !== 'string') {
    return config.publicRoutePrefix;
  }
  if (!path.startsWith('/')) {
    return '/' + path;
  }
  return config.publicRoutePrefix + path;
}

module.exports = {
  $withPrefix
}
