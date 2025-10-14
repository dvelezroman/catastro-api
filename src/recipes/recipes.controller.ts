import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: Prisma.RecipeCreateInput) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Get('restaurant/:restaurantId')
  getRecipesByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.recipesService.getRecipesByRestaurant(restaurantId);
  }

  @Post(':recipeId/restaurant/:restaurantId')
  addRecipeToRestaurant(
    @Param('recipeId') recipeId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.recipesService.addRecipeToRestaurant(restaurantId, recipeId);
  }

  @Delete(':recipeId/restaurant/:restaurantId')
  removeRecipeFromRestaurant(
    @Param('recipeId') recipeId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.recipesService.removeRecipeFromRestaurant(
      restaurantId,
      recipeId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: Prisma.RecipeUpdateInput,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
