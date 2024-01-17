import { Connection, ConnectionOptions } from 'typeorm';
import * as mysql from 'mysql2/promise';
import { ConfigService } from 'nestjs-config';
import { HttpException, Logger } from '@nestjs/common';
import * as os from 'os';
import * as fetch from 'isomorphic-fetch';

export function initDatabase() {
  mysql
    .createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT),
    })
    .then(async (conn) => {
      const [rows] = await conn.execute(`SHOW DATABASES LIKE '${process.env.MYSQL_DATABASE}'`);
      if (Array.isArray(rows) && rows.length === 0) {
        await conn.execute(`CREATE DATABASE ${process.env.MYSQL_DATABASE}`);
        Logger.log(`数据库创建成功[${process.env.MYSQL_DATABASE}]`);
      }
      await conn.end();
    });
}
