import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant, Prisma } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RestaurantCreateInput): Promise<Restaurant> {
    return this.prisma.restaurant.create({
      data,
      include: {
        owner: true,
        restaurantRecipes: {
          include: {
            recipe: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany({
      include: {
        owner: true,
        restaurantRecipes: {
          include: {
            recipe: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        owner: true,
        restaurantRecipes: {
          include: {
            recipe: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.RestaurantUpdateInput): Promise<Restaurant> {
    return this.prisma.restaurant.update({
      where: { id },
      data,
      include: {
        owner: true,
        restaurantRecipes: {
          include: {
            recipe: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<Restaurant> {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }

  async createWithOwner(restaurantData: Prisma.RestaurantCreateInput, ownerData: Prisma.OwnerCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      // Create owner first
      const owner = await tx.owner.create({
        data: ownerData,
      });

      // Create restaurant with owner
      const restaurant = await tx.restaurant.create({
        data: {
          ...restaurantData,
          owner: {
            connect: { id: owner.id },
          },
        },
        include: {
          owner: true,
          restaurantRecipes: {
            include: {
              recipe: true,
            },
          },
        },
      });

      return restaurant;
    });
  }

  async createRestaurantWithOwnerAndRecipes(data: {
    restaurant: Prisma.RestaurantCreateInput;
    owner: Prisma.OwnerCreateInput;
    recipeIds: string[];
  }) {
    return this.prisma.$transaction(async (tx) => {
      // Create owner first
      const owner = await tx.owner.create({
        data: data.owner,
      });

      // Create restaurant with owner
      const restaurant = await tx.restaurant.create({
        data: {
          ...data.restaurant,
          owner: {
            connect: { id: owner.id },
          },
        },
      });

      // Create restaurant-recipe relationships
      if (data.recipeIds.length > 0) {
        await tx.restaurantRecipe.createMany({
          data: data.recipeIds.map(recipeId => ({
            restaurantId: restaurant.id,
            recipeId: recipeId,
          })),
        });
      }

      // Return restaurant with all relationships
      return tx.restaurant.findUnique({
        where: { id: restaurant.id },
        include: {
          owner: true,
          restaurantRecipes: {
            include: {
              recipe: true,
            },
          },
        },
      });
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
