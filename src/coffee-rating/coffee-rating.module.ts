import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { DatabaseModule } from '../database/database.module';
import { CoffeesModule } from '../coffees/coffees.module';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // TypeORM will automatically use the username and password from the environment variables
      password: 'pass123',
      database: 'postgres',
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule { }
