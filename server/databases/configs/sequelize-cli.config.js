/**
 * @file databases/configs/sequelize-cli.config.js
 * @description sequelize-cli 설정 파일
 * 251117 v1.0.0 김민현 최초 작성
 */

import '../../configs/env.config.js';

export default { // env 불러오는 처리를 자동으로 했기 때문에 다 똑같이 설정하면 됨
  development: {
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DB_NAME,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    timezone: process.env.DB_MYSQL_TIMEZONE
  },
  test: {
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DB_NAME,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    timezone: process.env.DB_MYSQL_TIMEZONE
  },
  production: {
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DB_NAME,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    timezone: process.env.DB_MYSQL_TIMEZONE
  }
}
