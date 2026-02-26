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
import { RecipesService } from './recipes.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  addRecipeToRestaurant(
    @Param('recipeId') recipeId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.recipesService.addRecipeToRestaurant(restaurantId, recipeId);
  }

  @Delete(':recipeId/restaurant/:restaurantId')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: Prisma.RecipeUpdateInput,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
