import { DataSource } from 'typeorm';
import { config } from '../config';

export const dataSource = new DataSource({
  type: config.db.type,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: ['src/entities/*.js', 'src/entities/*.ts'],
  synchronize: true,
});
