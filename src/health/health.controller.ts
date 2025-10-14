import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get basic health status' })
  @ApiResponse({
    status: 200,
    description: 'Health status retrieved successfully',
  })
  async getHealth() {
    return this.healthService.getHealthStatus();
  }

  @Get('detailed')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get detailed health status with database stats' })
  @ApiResponse({
    status: 200,
    description: 'Detailed health status retrieved successfully',
  })
  async getDetailedHealth() {
    return this.healthService.getDetailedHealthStatus();
  }

  @Get('ready')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Readiness probe for Kubernetes/Docker' })
  @ApiResponse({
    status: 200,
    description: 'Readiness status retrieved successfully',
  })
  async getReadiness() {
    const health = await this.healthService.getHealthStatus();
    return {
      ready: health.status === 'healthy',
      timestamp: health.timestamp,
    };
  }

  @Get('live')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liveness probe for Kubernetes/Docker' })
  @ApiResponse({
    status: 200,
    description: 'Liveness status retrieved successfully',
  })
  async getLiveness() {
    return {
      alive: true,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
