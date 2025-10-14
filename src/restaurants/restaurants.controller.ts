import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant, Prisma } from '@prisma/client';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() createRestaurantDto: Prisma.RestaurantCreateInput) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Post('with-owner')
  createWithOwner(
    @Body() body: {
      restaurant: Prisma.RestaurantCreateInput;
      owner: Prisma.OwnerCreateInput;
    }
  ) {
    return this.restaurantsService.createWithOwner(body.restaurant, body.owner);
  }

  @Post('complete')
  createRestaurantWithOwnerAndRecipes(
    @Body() body: {
      restaurant: Prisma.RestaurantCreateInput;
      owner: Prisma.OwnerCreateInput;
      recipeIds: string[];
    }
  ) {
    return this.restaurantsService.createRestaurantWithOwnerAndRecipes(body);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Post(':id/recipes/:recipeId')
  addRecipeToRestaurant(
    @Param('id') id: string,
    @Param('recipeId') recipeId: string,
  ) {
    return this.restaurantsService.addRecipeToRestaurant(id, recipeId);
  }

  @Delete(':id/recipes/:recipeId')
  removeRecipeFromRestaurant(
    @Param('id') id: string,
    @Param('recipeId') recipeId: string,
  ) {
    return this.restaurantsService.removeRecipeFromRestaurant(id, recipeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: Prisma.RestaurantUpdateInput) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
