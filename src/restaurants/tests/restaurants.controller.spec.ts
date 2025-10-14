import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from '../restaurants.controller';
import { RestaurantsService } from '../restaurants.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;

  const mockRestaurantsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    createWithOwner: jest.fn(),
    createRestaurantWithOwnerAndRecipes: jest.fn(),
    addRecipeToRestaurant: jest.fn(),
    removeRecipeFromRestaurant: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsService,
          useValue: mockRestaurantsService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create when POST /restaurants', async () => {
    const restaurantData = {
      name: 'Test Restaurant',
      address: 'Test Address',
      latitude: 0,
      longitude: 0,
    };

    const expectedResult = { id: '1', ...restaurantData };
    mockRestaurantsService.create.mockResolvedValue(expectedResult);

    const result = await controller.create(restaurantData);

    expect(mockRestaurantsService.create).toHaveBeenCalledWith(restaurantData);
    expect(result).toEqual(expectedResult);
  });

  it('should call service.findAll when GET /restaurants', async () => {
    const expectedResult = [{ id: '1', name: 'Test Restaurant' }];
    mockRestaurantsService.findAll.mockResolvedValue(expectedResult);

    const result = await controller.findAll();

    expect(mockRestaurantsService.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should call service.findOne when GET /restaurants/:id', async () => {
    const restaurantId = '1';
    const expectedResult = { id: restaurantId, name: 'Test Restaurant' };
    mockRestaurantsService.findOne.mockResolvedValue(expectedResult);

    const result = await controller.findOne(restaurantId);

    expect(mockRestaurantsService.findOne).toHaveBeenCalledWith(restaurantId);
    expect(result).toEqual(expectedResult);
  });
});
