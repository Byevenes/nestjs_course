import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // TypeORM will automatically use the username and password from the environment variables
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true, // TypeORM will automatically load the entities from the entities folder
      synchronize: true, // TypeORM will automatically synchronize the database schema with the entities
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
