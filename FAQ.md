## 常见问题

### Error: ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: Incorrect string value: '\xF0\x9F\x8F\x84\xE2\x80...' for column 'content' at row 1

尝试将 `emoji` 表情保存到数据库时出现上述错误

解决：

- 确保数据库连接的 `charset` 为 `utf8mb4`
- 确保数据库的 `charset` 为 `utf8mb4`
- 确保表和列的 `charset` 为 `utf8mb4`

相关连接：https://stackoverflow.com/questions/10957238/incorrect-string-value-when-trying-to-insert-utf-8-into-mysql-via-jdbc

### Uncaught TypeError: Failed to execute 'createComment' on 'Document': 1 argument required, but only 0 present. at HTMLButtonElement.onclick (1:55)

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
