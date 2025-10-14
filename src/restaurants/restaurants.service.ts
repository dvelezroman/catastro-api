import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant, Prisma } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RestaurantCreateInput): Promise<Restaurant> {
    return this.prisma.restaurant.create({
      data,
    });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: string): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.RestaurantUpdateInput): Promise<Restaurant> {
    return this.prisma.restaurant.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Restaurant> {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
}
