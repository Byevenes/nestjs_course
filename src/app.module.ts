import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.interface';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true, // TypeORM will automatically load the entities from the entities folder
        synchronize: true, // TypeORM will automatically synchronize the database schema with the entities
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig], // This is to load the config object
      //ignoreEnvFile: true, // This is to ignore the .env file in production
      // validate: config, // This is to validate the config object
      validate: (config) => {
        // This is to validate the config object
        // if you want to use a custom validation function
        // instead of the config object
        // return config;
        const stage = config.STAGE;
        if (!stage) {
          console.log(`STAGE env not defined, will try to load`);
        }

        return configValidationSchema.parse(config);
      },
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
