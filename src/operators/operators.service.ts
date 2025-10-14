import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Operator, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class OperatorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OperatorCreateInput): Promise<Operator> {
    // Hash password if provided
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.operator.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        identification: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(): Promise<Operator[]> {
    return this.prisma.operator.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        identification: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string): Promise<Operator | null> {
    return this.prisma.operator.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        identification: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.OperatorUpdateInput,
  ): Promise<Operator> {
    // Hash password if provided
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.operator.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        identification: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string): Promise<Operator> {
    return this.prisma.operator.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        identification: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
