const mysql = require('mysql');
const session = require('koa-session-minimal');
const MySQLStore = require('koa-mysql-session');
const config = require('./config');

// 因为需要保存 emoji 表情，指定 connection 的 charset 为 utf8mb4
const connection = mysql.createConnection({...config.mysql, charset: 'utf8mb4'});

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
  // 用户
  createUser(values) {
    return query(`insert user set username=?,password=?`, values);
  },
  userLogin(values) {
    return query(`select * from user where username=? && password=?`, values);
  },
  userDetail(values) {
    return query(`select username,create_time from user where id=?`, values);
  },
  // 帖子
  postList(values) {
    return query(`select * from post`, values);
  },
  createPost(values) {
    return query(`insert post set title=?,author=?,author_id=?,content=?`, values);
  },
  postDetail(values) {
    return query(`select * from post where id=?`, values);
  },
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
  initPost() {
    query(`create table if not exists post(
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(100) NOT NULL COMMENT '标题',
      author VARCHAR(100) NOT NULL COMMENT '楼主',
      author_id int NOT NULL COMMENT '楼主ID',
      create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发帖时间',
      content VARCHAR(100) NOT NULL COMMENT '内容',
      PRIMARY KEY(id)
     );`);
  },
}
