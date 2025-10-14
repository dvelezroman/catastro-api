import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Operator, Prisma } from '@prisma/client';

@Injectable()
export class OperatorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OperatorCreateInput): Promise<Operator> {
    return this.prisma.operator.create({
      data,
    });
  }

  async findAll(): Promise<Operator[]> {
    return this.prisma.operator.findMany();
  }

  async findOne(id: string): Promise<Operator | null> {
    return this.prisma.operator.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.OperatorUpdateInput): Promise<Operator> {
    return this.prisma.operator.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Operator> {
    return this.prisma.operator.delete({
      where: { id },
    });
  }
}
