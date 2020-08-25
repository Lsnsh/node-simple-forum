module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/node-simple-forum' : '',
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'r123oot4',
    database: 'node_simple_forum'
  },
  version: require('../package.json').version
}
