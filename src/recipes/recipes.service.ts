import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Recipe, Prisma } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RecipeCreateInput): Promise<Recipe> {
    return this.prisma.recipe.create({
      data,
    });
  }

  async findAll(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      include: {
        restaurantRecipes: {
          include: {
            restaurant: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Recipe | null> {
    return this.prisma.recipe.findUnique({
      where: { id },
      include: {
        restaurantRecipes: {
          include: {
            restaurant: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.RecipeUpdateInput): Promise<Recipe> {
    return this.prisma.recipe.update({
      where: { id },
      data,
      include: {
        restaurantRecipes: {
          include: {
            restaurant: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<Recipe> {
    return this.prisma.recipe.delete({
      where: { id },
    });
  }

  async getRecipesByRestaurant(restaurantId: string) {
    return this.prisma.recipe.findMany({
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
  }

  async addRecipeToRestaurant(restaurantId: string, recipeId: string) {
    return this.prisma.restaurantRecipe.create({
      data: {
        restaurantId,
        recipeId,
      },
      include: {
        restaurant: true,
        recipe: true,
      },
    });
  }

  async removeRecipeFromRestaurant(restaurantId: string, recipeId: string) {
    return this.prisma.restaurantRecipe.deleteMany({
      where: {
        restaurantId,
        recipeId,
      },
    });
  }
}
