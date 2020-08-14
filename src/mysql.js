const mysql = require('mysql');
const session = require('koa-session-minimal');
const MySQLStore = require('koa-mysql-session');
const config = require('./config');

const connection = mysql.createConnection(config.mysql);

const query = (sql, values) => {
  console.log('values: ', values);
  return new Promise((resolve, reject) => {
    connection.query({
      sql,
      values
    }, (error, results, fields) => {
      if (error) {
        reject(error)
      };
      resolve(results, fields);
    });
  })
}

module.exports = {
  connect() {
    connection.connect(function (err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
    });
  },
  initSession(app) {
    app.use(session({
      key: 'SESSION_KEY',
      store: new MySQLStore(config.mysql)
    }));
  },
  initTable() {
    query(`create table if not exists user(
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(100) NOT NULL COMMENT '用户名',
      password VARCHAR(100) NOT NULL COMMENT '用户密码',
      create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
      PRIMARY KEY ( id )
     );`);
  },
  createUser(values) {
    return query(`insert user set username=?,password=?`, values);
  },
  userLogin(values) {
    return query(`select * from user where username=? && password=?`, values);
  }
}
