import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OwnersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOwnerDto: Prisma.OwnerCreateInput) {
    return this.prisma.owner.create({
      data: createOwnerDto,
    });
  }

  async findAll() {
    return this.prisma.owner.findMany({
      include: {
        restaurants: true,
      },
    });
  }

  async findOne(id: string) {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
      include: {
        restaurants: true,
      },
    });

    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    return owner;
  }

  async getRestaurantsByOwner(id: string) {
    const owner = await this.findOne(id);
    return owner.restaurants;
  }

  async update(id: string, updateOwnerDto: Prisma.OwnerUpdateInput) {
    await this.findOne(id);

    return this.prisma.owner.update({
      where: { id },
      data: updateOwnerDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.owner.delete({
      where: { id },
    });
  }
}
