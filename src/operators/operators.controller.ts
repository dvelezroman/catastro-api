import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { Operator, Prisma } from '@prisma/client';

@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Post()
  create(@Body() createOperatorDto: Prisma.OperatorCreateInput) {
    return this.operatorsService.create(createOperatorDto);
  }

  @Get()
  findAll() {
    return this.operatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operatorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperatorDto: Prisma.OperatorUpdateInput) {
    return this.operatorsService.update(id, updateOperatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operatorsService.remove(id);
  }
}
