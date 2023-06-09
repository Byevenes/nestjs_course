import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee, Event, Flavor } from './entities';

class MockCoffeesService { }

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    {
      provide: CoffeesService,
      useValue: new MockCoffeesService(), // mock implementation
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule { }
