import { DataSource } from 'typeorm';
import { Coffee } from './src/coffees/entities/coffee.entity';
import { Flavor } from './src/coffees/entities/flavor.entity';
import {
  CoffeeRefactor1683413098253,
  SchemaSync1683415734503,
} from 'src/migrations';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1683413098253, SchemaSync1683415734503],
  //entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  //migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
});
