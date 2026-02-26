import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { Prisma } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOwnerDto, UpdateOwnerDto } from '../dto/owner.dto';

@ApiTags('Owners')
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new owner' })
  @ApiBody({ type: CreateOwnerDto })
  @ApiResponse({ status: 201, description: 'Owner created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createOwnerDto: Prisma.OwnerCreateInput) {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all owners' })
  @ApiResponse({
    status: 200,
    description: 'List of owners retrieved successfully',
  })
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get owner by ID' })
  @ApiParam({ name: 'id', description: 'Owner ID' })
  @ApiResponse({ status: 200, description: 'Owner found' })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(id);
  }

  @Get(':id/restaurants')
  @ApiOperation({ summary: 'Get restaurants by owner ID' })
  @ApiParam({ name: 'id', description: 'Owner ID' })
  @ApiResponse({
    status: 200,
    description: 'List of restaurants owned by the owner',
  })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  getRestaurantsByOwner(@Param('id') id: string) {
    return this.ownersService.getRestaurantsByOwner(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update owner' })
  @ApiParam({ name: 'id', description: 'Owner ID' })
  @ApiBody({ type: UpdateOwnerDto })
  @ApiResponse({ status: 200, description: 'Owner updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  update(
    @Param('id') id: string,
    @Body() updateOwnerDto: Prisma.OwnerUpdateInput,
  ) {
    return this.ownersService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete owner' })
  @ApiParam({ name: 'id', description: 'Owner ID' })
  @ApiResponse({ status: 200, description: 'Owner deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  remove(@Param('id') id: string) {
    return this.ownersService.remove(id);
  }
}
