import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee, Event, Flavor } from './entities';
import { COFFEE_BRANDS } from './coffees.constans';

class MockCoffeesService { }
class ConfigService { }
class DevelopmentConfigService { }
class ProductionConfigService { }

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule { }
