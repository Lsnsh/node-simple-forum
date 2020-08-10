## node-simple-forum

使用 `koa2` 搭建的一个简易论坛，包含用户登陆注册，帖子发布、修改、删除、列表、评论等功能

```
git clone git@github.com:Lsnsh/node-simple-forum.git
npm i
npm run dev
```

## 初始化数据库

```sql
CREATE DATABASE node_simple_forum;
SHOW DATABASES
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| node_simple_forum  |
| performance_schema |
| sys                |
+--------------------+

create table if not exists user(
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL COMMENT '用户名',
  password VARCHAR(100) NOT NULL COMMENT '用户密码',
  create_time VARCHAR(100) NOT NULL COMMENT '注册时间',
  PRIMARY KEY ( id )
);
```

使用 `mysql 8.x`，连接数据库时，如果遇到下面的错误

```log
error connecting: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

可以尝试执行下面的语句，具体可以看看这篇 [stackoverflow](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';

flush privileges;
```

### 客户端

- 首页（帖子列表）
- 帖子详情
- 发布帖子
- 登陆/注册

### 服务端

- 新建帖子
- 删除帖子
- 修改帖子
- 帖子列表
- 帖子回复

- 新建用户
- 删除用户
- 修改用户
- 查询用户

- 退出登陆
