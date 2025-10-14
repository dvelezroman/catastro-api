import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { Owner, Prisma } from '@prisma/client';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  create(@Body() createOwnerDto: Prisma.OwnerCreateInput) {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(id);
  }

  @Get(':id/restaurants')
  getRestaurantsByOwner(@Param('id') id: string) {
    return this.ownersService.getRestaurantsByOwner(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: Prisma.OwnerUpdateInput) {
    return this.ownersService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownersService.remove(id);
  }
}
