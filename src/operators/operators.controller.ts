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
import { OperatorsService } from './operators.service';
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
import { CreateOperatorDto, UpdateOperatorDto } from '../dto/operator.dto';

@ApiTags('Operators')
@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new operator' })
  @ApiBody({ type: CreateOperatorDto })
  @ApiResponse({ status: 201, description: 'Operator created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createOperatorDto: Prisma.OperatorCreateInput) {
    return this.operatorsService.create(createOperatorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all operators' })
  @ApiResponse({
    status: 200,
    description: 'List of operators retrieved successfully',
  })
  findAll() {
    return this.operatorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get operator by ID' })
  @ApiParam({ name: 'id', description: 'Operator ID' })
  @ApiResponse({ status: 200, description: 'Operator found' })
  @ApiResponse({ status: 404, description: 'Operator not found' })
  findOne(@Param('id') id: string) {
    return this.operatorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update operator' })
  @ApiParam({ name: 'id', description: 'Operator ID' })
  @ApiBody({ type: UpdateOperatorDto })
  @ApiResponse({ status: 200, description: 'Operator updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Operator not found' })
  update(
    @Param('id') id: string,
    @Body() updateOperatorDto: Prisma.OperatorUpdateInput,
  ) {
    return this.operatorsService.update(id, updateOperatorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete operator' })
  @ApiParam({ name: 'id', description: 'Operator ID' })
  @ApiResponse({ status: 200, description: 'Operator deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Operator not found' })
  remove(@Param('id') id: string) {
    return this.operatorsService.remove(id);
  }
}
