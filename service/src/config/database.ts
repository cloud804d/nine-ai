import { join } from 'path';
import { ConnectionOptions, Connection } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  port: parseInt(process.env.MYSQL_PORT),
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  logging: false,
  synchronize: true,
  charset: 'utf8mb4',
  // timezone: 'Z',
  timezone: '+08:00',
};
export default config;
