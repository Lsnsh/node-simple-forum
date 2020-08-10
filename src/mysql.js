const mysql = require('mysql');
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

      // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      //   if (error) throw error;
      //   console.log('The solution is: ', results[0].solution);
      // });
    });
  },
  initTable() {
    query(`create table if not exists user(
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(100) NOT NULL COMMENT '用户名',
      password VARCHAR(100) NOT NULL COMMENT '用户密码',
      create_time VARCHAR(100) NOT NULL COMMENT '注册时间',
      PRIMARY KEY ( id )
     );`);
  },
  createUser(values) {
    return query(`insert user set username=?,password=?`, values);
  }
}

// alter table user change column create_time create_time TIMESTAMP NOT NULL DEFAULT REPLACE(unix_timestamp(current_timestamp(3)),'.','');

// alter table user change column create_time create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP();
