# node-simple-forum

基于 nodejs koa2 + mysql 的简易论坛

## 功能点

- 帖子列表/详情
- 发布/删除/<del>修改</del>/回复帖子
- 用户详情/登陆/注册/退出

## 开发

先确保安装了 `mysql` 数据库，如果未安装的话，到官网下载安装包: https://dev.mysql.com/downloads/mysql/

```sql
# 需要手动创建数据库
CREATE DATABASE node_simple_forum;
SHOW DATABASES;
```

```sql
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| node_simple_forum  |
| performance_schema |
| sys                |
+--------------------+
```

克隆并启动项目，项目启动时会尝试创建数据表

```
git clone git@github.com:Lsnsh/node-simple-forum.git
npm i
npm run dev
```

## 部署

### 安装 mysql

项目使用的是 `mysql 8.x` 版本

#### 网络状况良好，可以直接使用系统对应的包管理器安装 `mysql`，比如在 `ubuntu` 上，可以这样安装：

```bash
sudo apt-get install mysql-server
```

#### 网络状况不好，或者使用包管理器安装失败，可以选择手动安装

从官网下载对应的安装包（完整版）：https://dev.mysql.com/downloads/mysql/

使用 scp 命令，从本地将安装包拷贝到远程服务器：

```bash
scp mysql-server_8.0.21-1ubuntu16.04_amd64.deb-bundle.tar ${userName}@${ipAddress}:/home/${userName}
```

然后按照 `mysql` 官方文档的步骤，一步一步完成安装：https://dev.mysql.com/doc/refman/8.0/en/linux-installation-debian.html

其他 linux 系统手动安装的步骤看这里：
https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html

ubuntu 下可能遇到使用 `sudo apt-get -f install` 修复后依然报错的问题：

```log
(Reading database ... 67123 files and directories currently installed.)
Preparing to unpack mysql-common_8.0.21-1ubuntu16.04_amd64.deb ...
Unpacking mysql-common (8.0.21-1ubuntu16.04) over (8.0.21-1ubuntu16.04) ...
Preparing to unpack mysql-community-client_8.0.21-1ubuntu16.04_amd64.deb ...
Unpacking mysql-community-client (8.0.21-1ubuntu16.04) over (8.0.21-1ubuntu16.04) ...
Preparing to unpack mysql-client_8.0.21-1ubuntu16.04_amd64.deb ...
Unpacking mysql-client (8.0.21-1ubuntu16.04) over (8.0.21-1ubuntu16.04) ...
Preparing to unpack mysql-community-server_8.0.21-1ubuntu16.04_amd64.deb ...
Unpacking mysql-community-server (8.0.21-1ubuntu16.04) over (8.0.21-1ubuntu16.04) ...
Preparing to unpack mysql-server_8.0.21-1ubuntu16.04_amd64.deb ...
Unpacking mysql-server (8.0.21-1ubuntu16.04) over (8.0.21-1ubuntu16.04) ...
Setting up mysql-common (8.0.21-1ubuntu16.04) ...
dpkg: dependency problems prevent configuration of mysql-community-client:
 mysql-community-client depends on mysql-community-client-core (= 8.0.21-1ubuntu16.04); however:
  Package mysql-community-client-core is not installed.

dpkg: error processing package mysql-community-client (--install):
 dependency problems - leaving unconfigured
dpkg: dependency problems prevent configuration of mysql-client:
 mysql-client depends on mysql-community-client (= 8.0.21-1ubuntu16.04); however:
  Package mysql-community-client is not configured yet.

dpkg: error processing package mysql-client (--install):
 dependency problems - leaving unconfigured
dpkg: dependency problems prevent configuration of mysql-community-server:
 mysql-community-server depends on mysql-client (= 8.0.21-1ubuntu16.04); however:
  Package mysql-client is not configured yet.
 mysql-community-server depends on mysql-community-server-core (= 8.0.21-1ubuntu16.04); however:
  Package mysql-community-server-core is not installed.

dpkg: error processing package mysql-community-server (--install):
 dependency problems - leaving unconfigured
dpkg: dependency problems prevent configuration of mysql-server:
 mysql-server depends on mysql-community-server (= 8.0.21-1ubuntu16.04); however:
  Package mysql-community-server is not configured yet.

dpkg: error processing package mysql-server (--install):
 dependency problems - leaving unconfigured
Processing triggers for man-db (2.7.5-1) ...
Errors were encountered while processing:
 mysql-community-client
 mysql-client
 mysql-community-server
 mysql-server
```

`mysql-community-client-core` 和 `mysql-community-server-core` 这两个软件包没有安装

由于我们下载了 `mysql` 的完整版的安装包，手动安装这两个包，然后再修复依赖项，完整步骤如下：

```shell
# 安装通用文件包，客户端包，客户端元包，服务器包和服务器元包
sudo dpkg -i mysql-{common,community-client,client,community-server,server}_*.deb

# 手动安装缺失的核心包
sudo dpkg -i mysql-{community-client-core,community-server-core}_*.deb

# 修复依赖项
sudo apt-get -f instal
```

### 配置 nginx

```nginx
# ...
upstream node_simple_forum_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

location /node-simple-forum {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_pass http://node_simple_forum_upstream/;
    proxy_redirect off;
    proxy_read_timeout 240s;
}
# ...
```

### 安装并启动 pm2

项目使用 `pm2` 来管理 `node` 进程，更多命令和配置请看文档：
https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/

全局安装

```bash
npm i -g pm2
```

进入项目目录，启动 pm2

```bash
pm2 start ecosystem.config.js
```

打开浏览器访问：\${host}/node-simple-forum

如果状态码 `502` 或者其他错误，使用下面的命令查看最近 `100` 条日志：

```bash
pm2 logs --lines 100
```

## 常见问题

开发中遇到的问题，[请看这里](./FAQ.md)
