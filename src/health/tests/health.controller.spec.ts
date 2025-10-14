import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../health.controller';
import { HealthService } from '../health.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('HealthController', () => {
  let controller: HealthController;

  const mockHealthService = {
    getHealthStatus: jest.fn(),
    getDetailedHealthStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: mockHealthService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.getHealthStatus when GET /health', async () => {
    const expectedResult = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: 1000,
      database: { status: 'connected', responseTime: '10ms' },
      memory: { used: 50, total: 100, unit: 'MB' },
      environment: 'test',
      version: '1.0.0',
    };

    mockHealthService.getHealthStatus.mockResolvedValue(expectedResult);

    const result = await controller.getHealth();

    expect(mockHealthService.getHealthStatus).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should call service.getDetailedHealthStatus when GET /health/detailed', async () => {
    const expectedResult = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: 1000,
      database: {
        status: 'connected',
        responseTime: '10ms',
        stats: { restaurants: 5, owners: 3, recipes: 10, operators: 2 },
      },
      memory: { used: 50, total: 100, external: 10, rss: 60, unit: 'MB' },
      system: {
        platform: 'test',
        arch: 'x64',
        nodeVersion: 'v18.0.0',
        pid: 1234,
      },
      environment: 'test',
      version: '1.0.0',
    };

    mockHealthService.getDetailedHealthStatus.mockResolvedValue(expectedResult);

    const result = await controller.getDetailedHealth();

    expect(mockHealthService.getDetailedHealthStatus).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should return readiness status when GET /health/ready', async () => {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };

    mockHealthService.getHealthStatus.mockResolvedValue(healthStatus);

    const result = await controller.getReadiness();

    expect(mockHealthService.getHealthStatus).toHaveBeenCalled();
    expect(result).toEqual({
      ready: true,
      timestamp: healthStatus.timestamp,
    });
  });

  it('should return liveness status when GET /health/live', async () => {
    const result = await controller.getLiveness();

    expect(result).toEqual({
      alive: true,
      timestamp: expect.any(String),
      uptime: expect.any(Number),
    });
  });
});
