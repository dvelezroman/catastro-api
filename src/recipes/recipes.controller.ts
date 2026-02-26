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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/recipe.dto';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiBody({ type: CreateRecipeDto })
  @ApiResponse({ status: 201, description: 'Recipe created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createRecipeDto: Prisma.RecipeCreateInput) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all recipes' })
  @ApiResponse({
    status: 200,
    description: 'List of recipes retrieved successfully',
  })
  findAll() {
    return this.recipesService.findAll();
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get recipes by restaurant ID' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiResponse({
    status: 200,
    description: 'List of recipes for the restaurant',
  })
  getRecipesByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.recipesService.getRecipesByRestaurant(restaurantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get recipe by ID' })
  @ApiParam({ name: 'id', description: 'Recipe ID' })
  @ApiResponse({ status: 200, description: 'Recipe found' })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Post(':recipeId/restaurant/:restaurantId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add recipe to restaurant' })
  @ApiParam({ name: 'recipeId', description: 'Recipe ID' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiResponse({ status: 201, description: 'Recipe added to restaurant successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Restaurant or recipe not found' })
  addRecipeToRestaurant(
    @Param('recipeId') recipeId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.recipesService.addRecipeToRestaurant(restaurantId, recipeId);
  }

  @Delete(':recipeId/restaurant/:restaurantId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove recipe from restaurant' })
  @ApiParam({ name: 'recipeId', description: 'Recipe ID' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiResponse({ status: 200, description: 'Recipe removed from restaurant successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Restaurant or recipe not found' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update recipe' })
  @ApiParam({ name: 'id', description: 'Recipe ID' })
  @ApiBody({ type: UpdateRecipeDto })
  @ApiResponse({ status: 200, description: 'Recipe updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: Prisma.RecipeUpdateInput,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete recipe' })
  @ApiParam({ name: 'id', description: 'Recipe ID' })
  @ApiResponse({ status: 200, description: 'Recipe deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
