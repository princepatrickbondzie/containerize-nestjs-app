import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../auth/entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'db',
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  // autoLoadEntities: true,
  entities: [User, Order, Product],
  migrations: ['src/migrations/*.{ts,js}'],
  // synchronize: true,
  logging: true,
};

const AppDataSource = new DataSource(dataSourceOptions);
AppDataSource.initialize();

export default AppDataSource;
