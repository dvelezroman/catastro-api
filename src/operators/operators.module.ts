import { Module } from '@nestjs/common';
import { OperatorsController } from './operators.controller';
import { OperatorsService } from './operators.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OperatorsController],
  providers: [OperatorsService, PrismaService],
})
export class OperatorsModule {}
