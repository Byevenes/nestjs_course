import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee, Flavor } from './entities';
import coffeesConfig from './config/coffees.config';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Basic / empty "Mocks" for Entities in our CoffeesService
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        { provide: DataSource, useValue: {} },
        { provide: coffeesConfig.KEY, useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with id exists', () => {
      it('should return the coffee object', async () => {
        // Mocking the CoffeeRepository
        const coffeeId = '1';
        const expectedCoffee = {};

        // Mocking the CoffeeService
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);

        const coffee = await service.findOne(coffeeId);

        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        // Mocking the CoffeeRepository
        const coffeeId = '1';
        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy(); // Force test to fail if above line doesn't throw
        } catch (err: unknown) {
          // type catch error is really a NotFoundException
          expect(err).toBeInstanceOf(NotFoundException);
          expect((err as NotFoundException).message).toEqual(
            `Coffee #${coffeeId} not found`,
          );
        }
      });
    });
  });
});
