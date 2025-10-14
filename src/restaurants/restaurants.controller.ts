import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { Prisma } from '@prisma/client';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  CreateRestaurantWithOwnerDto,
} from '../dto/restaurant.dto';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiResponse({ status: 201, description: 'Restaurant created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createRestaurantDto: Prisma.RestaurantCreateInput) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Post('with-owner')
  @ApiOperation({ summary: 'Create restaurant with owner' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        restaurant: { $ref: '#/components/schemas/CreateRestaurantDto' },
        owner: { $ref: '#/components/schemas/CreateOwnerDto' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Restaurant and owner created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createWithOwner(
    @Body()
    body: {
      restaurant: Prisma.RestaurantCreateInput;
      owner: Prisma.OwnerCreateInput;
    },
  ) {
    return this.restaurantsService.createWithOwner(body.restaurant, body.owner);
  }

  @Post('complete')
  @ApiOperation({ summary: 'Create restaurant with owner and recipes' })
  @ApiBody({ type: CreateRestaurantWithOwnerDto })
  @ApiResponse({
    status: 201,
    description: 'Restaurant, owner and recipes created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  createRestaurantWithOwnerAndRecipes(
    @Body()
    body: {
      restaurant: Prisma.RestaurantCreateInput;
      owner: Prisma.OwnerCreateInput;
      recipeIds: string[];
    },
  ) {
    return this.restaurantsService.createRestaurantWithOwnerAndRecipes(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({
    status: 200,
    description: 'List of restaurants retrieved successfully',
  })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant by ID' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Restaurant found' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Post(':id/recipes/:recipeId')
  @ApiOperation({ summary: 'Add recipe to restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiParam({ name: 'recipeId', description: 'Recipe ID' })
  @ApiResponse({
    status: 201,
    description: 'Recipe added to restaurant successfully',
  })
  @ApiResponse({ status: 404, description: 'Restaurant or recipe not found' })
  addRecipeToRestaurant(
    @Param('id') id: string,
    @Param('recipeId') recipeId: string,
  ) {
    return this.restaurantsService.addRecipeToRestaurant(id, recipeId);
  }

  @Delete(':id/recipes/:recipeId')
  @ApiOperation({ summary: 'Remove recipe from restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiParam({ name: 'recipeId', description: 'Recipe ID' })
  @ApiResponse({
    status: 200,
    description: 'Recipe removed from restaurant successfully',
  })
  @ApiResponse({ status: 404, description: 'Restaurant or recipe not found' })
  removeRecipeFromRestaurant(
    @Param('id') id: string,
    @Param('recipeId') recipeId: string,
  ) {
    return this.restaurantsService.removeRecipeFromRestaurant(id, recipeId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiResponse({ status: 200, description: 'Restaurant updated successfully' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: Prisma.RestaurantUpdateInput,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Restaurant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
