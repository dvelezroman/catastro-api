import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from '../recipes.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('RecipesService', () => {
  let service: RecipesService;

  const mockPrismaService = {
    recipe: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    restaurantRecipe: {
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a recipe', async () => {
      const recipeData: Prisma.RecipeCreateInput = {
        name: 'Test Recipe',
        description: 'Test Description',
      };

      const expectedRecipe = {
        id: '1',
        ...recipeData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.recipe.create.mockResolvedValue(expectedRecipe);

      const result = await service.create(recipeData);

      expect(mockPrismaService.recipe.create).toHaveBeenCalledWith({
        data: recipeData,
      });
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('findAll', () => {
    it('should return all recipes with restaurant associations', async () => {
      const expectedRecipes = [
        {
          id: '1',
          name: 'Recipe 1',
          description: 'Description 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          restaurantRecipes: [],
        },
        {
          id: '2',
          name: 'Recipe 2',
          description: 'Description 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          restaurantRecipes: [],
        },
      ];

      mockPrismaService.recipe.findMany.mockResolvedValue(expectedRecipes);

      const result = await service.findAll();

      expect(mockPrismaService.recipe.findMany).toHaveBeenCalledWith({
        include: {
          restaurantRecipes: {
            include: {
              restaurant: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRecipes);
    });
  });

  describe('findOne', () => {
    it('should return a recipe by id with restaurant associations', async () => {
      const recipeId = '1';
      const expectedRecipe = {
        id: recipeId,
        name: 'Test Recipe',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        restaurantRecipes: [],
      };

      mockPrismaService.recipe.findUnique.mockResolvedValue(expectedRecipe);

      const result = await service.findOne(recipeId);

      expect(mockPrismaService.recipe.findUnique).toHaveBeenCalledWith({
        where: { id: recipeId },
        include: {
          restaurantRecipes: {
            include: {
              restaurant: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRecipe);
    });

    it('should return null if recipe not found', async () => {
      const recipeId = '999';
      mockPrismaService.recipe.findUnique.mockResolvedValue(null);

      const result = await service.findOne(recipeId);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const recipeId = '1';
      const updateData: Prisma.RecipeUpdateInput = {
        name: 'Updated Recipe',
        description: 'Updated Description',
      };

      const expectedRecipe = {
        id: recipeId,
        name: 'Updated Recipe',
        description: 'Updated Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        restaurantRecipes: [],
      };

      mockPrismaService.recipe.update.mockResolvedValue(expectedRecipe);

      const result = await service.update(recipeId, updateData);

      expect(mockPrismaService.recipe.update).toHaveBeenCalledWith({
        where: { id: recipeId },
        data: updateData,
        include: {
          restaurantRecipes: {
            include: {
              restaurant: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('remove', () => {
    it('should delete a recipe', async () => {
      const recipeId = '1';
      const expectedRecipe = {
        id: recipeId,
        name: 'Test Recipe',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.recipe.delete.mockResolvedValue(expectedRecipe);

      const result = await service.remove(recipeId);

      expect(mockPrismaService.recipe.delete).toHaveBeenCalledWith({
        where: { id: recipeId },
      });
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('getRecipesByRestaurant', () => {
    it('should return recipes for a specific restaurant', async () => {
      const restaurantId = '1';
      const expectedRecipes = [
        {
          id: '1',
          name: 'Recipe 1',
          description: 'Description 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          restaurantRecipes: [
            {
              id: '1',
              restaurantId,
              recipeId: '1',
              createdAt: new Date(),
              restaurant: {
                id: restaurantId,
                name: 'Test Restaurant',
              },
            },
          ],
        },
      ];

      mockPrismaService.recipe.findMany.mockResolvedValue(expectedRecipes);

      const result = await service.getRecipesByRestaurant(restaurantId);

      expect(mockPrismaService.recipe.findMany).toHaveBeenCalledWith({
        where: {
          restaurantRecipes: {
            some: {
              restaurantId,
            },
          },
        },
        include: {
          restaurantRecipes: {
            include: {
              restaurant: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRecipes);
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
        restaurant: {
          id: restaurantId,
          name: 'Test Restaurant',
        },
        recipe: {
          id: recipeId,
          name: 'Test Recipe',
        },
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
