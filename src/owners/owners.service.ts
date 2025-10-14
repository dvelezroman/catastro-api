import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Owner, Prisma } from '@prisma/client';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OwnerCreateInput): Promise<Owner> {
    return this.prisma.owner.create({
      data,
    });
  }

  async findAll(): Promise<Owner[]> {
    return this.prisma.owner.findMany({
      include: {
        restaurants: true,
      },
    });
  }

  async findOne(id: string): Promise<Owner | null> {
    return this.prisma.owner.findUnique({
      where: { id },
      include: {
        restaurants: true,
      },
    });
  }

  async update(id: string, data: Prisma.OwnerUpdateInput): Promise<Owner> {
    return this.prisma.owner.update({
      where: { id },
      data,
      include: {
        restaurants: true,
      },
    });
  }

  async remove(id: string): Promise<Owner> {
    return this.prisma.owner.delete({
      where: { id },
    });
  }

  async getRestaurantsByOwner(ownerId: string) {
    return this.prisma.restaurant.findMany({
      where: { ownerId },
      include: {
        restaurantRecipes: {
          include: {
            recipe: true,
          },
        },
      },
    });
  }
}
