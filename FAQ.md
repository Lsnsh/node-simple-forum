## 常见问题

### Error: ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: Incorrect string value: '\xF0\x9F\x8F\x84\xE2\x80...' for column 'content' at row 1

尝试将 `emoji` 表情保存到数据库时出现上述错误

解决：

- 确保数据库连接的 `charset` 为 `utf8mb4`
- 确保数据库的 `charset` 为 `utf8mb4`
- 确保表和列的 `charset` 为 `utf8mb4`

相关连接：https://stackoverflow.com/questions/10957238/incorrect-string-value-when-trying-to-insert-utf-8-into-mysql-via-jdbc
