import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from '../restaurants.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  const mockPrismaService = {
    restaurant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    owner: {
      create: jest.fn(),
    },
    restaurantRecipe: {
      create: jest.fn(),
      createMany: jest.fn(),
      deleteMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a restaurant', async () => {
      const restaurantData: Prisma.RestaurantCreateInput = {
        name: 'Test Restaurant',
        address: 'Test Address',
        latitude: 0,
        longitude: 0,
      };

      const expectedRestaurant = {
        id: '1',
        ...restaurantData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.restaurant.create.mockResolvedValue(expectedRestaurant);

      const result = await service.create(restaurantData);

      expect(mockPrismaService.restaurant.create).toHaveBeenCalledWith({
        data: restaurantData,
        include: {
          owner: true,
          restaurantRecipes: {
            include: {
              recipe: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRestaurant);
    });
  });

  describe('findAll', () => {
    it('should return all restaurants', async () => {
      const expectedRestaurants = [
        {
          id: '1',
          name: 'Restaurant 1',
          address: 'Address 1',
          latitude: 0,
          longitude: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Restaurant 2',
          address: 'Address 2',
          latitude: 0,
          longitude: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.restaurant.findMany.mockResolvedValue(
        expectedRestaurants,
      );

      const result = await service.findAll();

      expect(mockPrismaService.restaurant.findMany).toHaveBeenCalledWith({
        include: {
          owner: true,
          restaurantRecipes: {
            include: {
              recipe: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRestaurants);
    });
  });

  describe('findOne', () => {
    it('should return a restaurant by id', async () => {
      const restaurantId = '1';
      const expectedRestaurant = {
        id: restaurantId,
        name: 'Test Restaurant',
        address: 'Test Address',
        latitude: 0,
        longitude: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.restaurant.findUnique.mockResolvedValue(
        expectedRestaurant,
      );

      const result = await service.findOne(restaurantId);

      expect(mockPrismaService.restaurant.findUnique).toHaveBeenCalledWith({
        where: { id: restaurantId },
        include: {
          owner: true,
          restaurantRecipes: {
            include: {
              recipe: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRestaurant);
    });

    it('should return null if restaurant not found', async () => {
      const restaurantId = '999';
      mockPrismaService.restaurant.findUnique.mockResolvedValue(null);

      const result = await service.findOne(restaurantId);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const restaurantId = '1';
      const updateData: Prisma.RestaurantUpdateInput = {
        name: 'Updated Restaurant',
      };

      const expectedRestaurant = {
        id: restaurantId,
        name: 'Updated Restaurant',
        address: 'Test Address',
        latitude: 0,
        longitude: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.restaurant.update.mockResolvedValue(expectedRestaurant);

      const result = await service.update(restaurantId, updateData);

      expect(mockPrismaService.restaurant.update).toHaveBeenCalledWith({
        where: { id: restaurantId },
        data: updateData,
        include: {
          owner: true,
          restaurantRecipes: {
            include: {
              recipe: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRestaurant);
    });
  });

  describe('remove', () => {
    it('should delete a restaurant', async () => {
      const restaurantId = '1';
      const expectedRestaurant = {
        id: restaurantId,
        name: 'Test Restaurant',
        address: 'Test Address',
        latitude: 0,
        longitude: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.restaurant.delete.mockResolvedValue(expectedRestaurant);

      const result = await service.remove(restaurantId);

      expect(mockPrismaService.restaurant.delete).toHaveBeenCalledWith({
        where: { id: restaurantId },
      });
      expect(result).toEqual(expectedRestaurant);
    });
  });

  describe('createWithOwner', () => {
    it('should create restaurant with owner in transaction', async () => {
      const restaurantData: Prisma.RestaurantCreateInput = {
        name: 'Test Restaurant',
        address: 'Test Address',
        latitude: 0,
        longitude: 0,
      };

      const ownerData: Prisma.OwnerCreateInput = {
        name: 'Test Owner',
        email: 'test@example.com',
      };

      const expectedOwner = { id: 'owner-1', ...ownerData };
      const expectedRestaurant = {
        id: '1',
        ...restaurantData,
        ownerId: 'owner-1',
        owner: expectedOwner,
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          owner: { create: mockPrismaService.owner.create },
          restaurant: { create: mockPrismaService.restaurant.create },
        });
      });

      mockPrismaService.owner.create.mockResolvedValue(expectedOwner);
      mockPrismaService.restaurant.create.mockResolvedValue(expectedRestaurant);

      const result = await service.createWithOwner(restaurantData, ownerData);

      expect(mockPrismaService.$transaction).toHaveBeenCalled();
      expect(result).toEqual(expectedRestaurant);
    });
  });

  describe('createRestaurantWithOwnerAndRecipes', () => {
    it('should create restaurant with owner and recipes', async () => {
      const data = {
        restaurant: {
          name: 'Test Restaurant',
          address: 'Test Address',
          latitude: 0,
          longitude: 0,
        } as Prisma.RestaurantCreateInput,
        owner: {
          name: 'Test Owner',
          email: 'test@example.com',
        } as Prisma.OwnerCreateInput,
        recipeIds: ['recipe-1', 'recipe-2'],
      };

      const expectedOwner = { id: 'owner-1', ...data.owner };
      const expectedRestaurant = {
        id: '1',
        ...data.restaurant,
        ownerId: 'owner-1',
        owner: expectedOwner,
      };

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return callback({
          owner: { create: mockPrismaService.owner.create },
          restaurant: {
            create: mockPrismaService.restaurant.create,
            findUnique: mockPrismaService.restaurant.findUnique,
          },
          restaurantRecipe: {
            createMany: mockPrismaService.restaurantRecipe.createMany,
          },
        });
      });

      mockPrismaService.owner.create.mockResolvedValue(expectedOwner);
      mockPrismaService.restaurant.create.mockResolvedValue(expectedRestaurant);
      mockPrismaService.restaurantRecipe.createMany.mockResolvedValue({
        count: 2,
      });
      mockPrismaService.restaurant.findUnique.mockResolvedValue(
        expectedRestaurant,
      );

      const result = await service.createRestaurantWithOwnerAndRecipes(data);

      expect(mockPrismaService.$transaction).toHaveBeenCalled();
      expect(result).toEqual(expectedRestaurant);
    });
  });

  describe('addRecipeToRestaurant', () => {
    it('should add recipe to restaurant', async () => {
      const restaurantId = '1';
      const recipeId = 'recipe-1';
      const expectedResult = {
        id: '1',
        restaurantId,
        recipeId,
        createdAt: new Date(),
      };

      mockPrismaService.restaurantRecipe.create.mockResolvedValue(
        expectedResult,
      );

      const result = await service.addRecipeToRestaurant(
        restaurantId,
        recipeId,
      );

      expect(mockPrismaService.restaurantRecipe.create).toHaveBeenCalledWith({
        data: { restaurantId, recipeId },
        include: {
          restaurant: true,
          recipe: true,
        },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('removeRecipeFromRestaurant', () => {
    it('should remove recipe from restaurant', async () => {
      const restaurantId = '1';
      const recipeId = 'recipe-1';

      mockPrismaService.restaurantRecipe.deleteMany.mockResolvedValue({
        count: 1,
      });

      const result = await service.removeRecipeFromRestaurant(
        restaurantId,
        recipeId,
      );

      expect(
        mockPrismaService.restaurantRecipe.deleteMany,
      ).toHaveBeenCalledWith({
        where: { restaurantId, recipeId },
      });
      expect(result).toEqual({ count: 1 });
    });
  });
});
