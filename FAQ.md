## 常见问题

### 1. error connecting: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

使用 `mysql 8.x`，连接数据库时，如果遇到上面的错误

原因：

`mysql 8.x` 使用了新的身份验证方法，但是当前项目使用的 [mysql](https://www.npmjs.com/package/mysql) 包不支持，

解决：

执行下面语句，使用旧版的身份验证方法，需要将 `your_password` 替换成实际的密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';

flush privileges;
```

相关链接：https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

### 2. Error: ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: Incorrect string value: '\xF0\x9F\x8F\x84\xE2\x80...' for column 'content' at row 1

尝试将 `emoji` 表情保存到数据库时出现上述错误

解决：

- 确保数据库连接的 `charset` 为 `utf8mb4`
- 确保数据库的 `charset` 为 `utf8mb4`
- 确保表和列的 `charset` 为 `utf8mb4`

相关连接：https://stackoverflow.com/questions/10957238/incorrect-string-value-when-trying-to-insert-utf-8-into-mysql-via-jdbc

### 3. Uncaught TypeError: Failed to execute 'createComment' on 'Document': 1 argument required, but only 0 present. at HTMLButtonElement.onclick (1:55)

点击按钮触发点击事件时出现上述错误

原因：

自定义的当方法名 `createComment()` 与 document.createComment() 冲突

解决：

修改方法名

```diff
-createComment()
+_createComment()
```

相关连接：https://stackoverflow.com/questions/46096878/failed-to-execute-function-on-document-1-argument-required-but-only-0-pres
