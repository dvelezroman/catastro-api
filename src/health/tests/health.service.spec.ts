import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from '../health.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('HealthService', () => {
  let service: HealthService;

  const mockPrismaService = {
    $queryRaw: jest.fn(),
    restaurant: {
      count: jest.fn(),
    },
    owner: {
      count: jest.fn(),
    },
    recipe: {
      count: jest.fn(),
    },
    operator: {
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHealthStatus', () => {
    it('should return healthy status when database is connected', async () => {
      mockPrismaService.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

      const result = await service.getHealthStatus();

      expect(mockPrismaService.$queryRaw).toHaveBeenCalledWith(['SELECT 1']);
      expect(result.status).toBe('healthy');
      expect(result.database.status).toBe('connected');
      expect(result.database.responseTime).toMatch(/\d+ms/);
      expect(result.memory).toHaveProperty('used');
      expect(result.memory).toHaveProperty('total');
      expect(result.memory).toHaveProperty('unit', 'MB');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('environment');
      expect(result).toHaveProperty('version');
    });

    it('should return unhealthy status when database connection fails', async () => {
      const error = new Error('Connection timeout');
      mockPrismaService.$queryRaw.mockRejectedValue(error);

      const result = await service.getHealthStatus();

      expect(mockPrismaService.$queryRaw).toHaveBeenCalledWith(['SELECT 1']);
      expect(result.status).toBe('unhealthy');
      expect(result.database.status).toBe('disconnected');
      expect(result.database.error).toBe('Connection timeout');
      expect(result.memory).toHaveProperty('used');
      expect(result.memory).toHaveProperty('total');
      expect(result.memory).toHaveProperty('unit', 'MB');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('environment');
      expect(result).toHaveProperty('version');
    });
  });

  describe('getDetailedHealthStatus', () => {
    it('should return detailed healthy status with database stats', async () => {
      mockPrismaService.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);
      mockPrismaService.restaurant.count.mockResolvedValue(25);
      mockPrismaService.owner.count.mockResolvedValue(12);
      mockPrismaService.recipe.count.mockResolvedValue(150);
      mockPrismaService.operator.count.mockResolvedValue(5);

      const result = await service.getDetailedHealthStatus();

      expect(mockPrismaService.$queryRaw).toHaveBeenCalledWith(['SELECT 1']);
      expect(mockPrismaService.restaurant.count).toHaveBeenCalled();
      expect(mockPrismaService.owner.count).toHaveBeenCalled();
      expect(mockPrismaService.recipe.count).toHaveBeenCalled();
      expect(mockPrismaService.operator.count).toHaveBeenCalled();

      expect(result.status).toBe('healthy');
      expect(result.database.status).toBe('connected');
      expect(result.database.responseTime).toMatch(/\d+ms/);
      expect(result.database.stats).toEqual({
        restaurants: 25,
        owners: 12,
        recipes: 150,
        operators: 5,
      });

      expect(result.memory).toHaveProperty('used');
      expect(result.memory).toHaveProperty('total');
      expect(result.memory).toHaveProperty('external');
      expect(result.memory).toHaveProperty('rss');
      expect(result.memory).toHaveProperty('unit', 'MB');

      expect(result.system).toHaveProperty('platform');
      expect(result.system).toHaveProperty('arch');
      expect(result.system).toHaveProperty('nodeVersion');
      expect(result.system).toHaveProperty('pid');

      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('environment');
      expect(result).toHaveProperty('version');
    });

    it('should return detailed unhealthy status when database connection fails', async () => {
      const error = new Error('Database connection failed');
      mockPrismaService.$queryRaw.mockRejectedValue(error);

      const result = await service.getDetailedHealthStatus();

      expect(mockPrismaService.$queryRaw).toHaveBeenCalledWith(['SELECT 1']);
      expect(mockPrismaService.restaurant.count).not.toHaveBeenCalled();
      expect(mockPrismaService.owner.count).not.toHaveBeenCalled();
      expect(mockPrismaService.recipe.count).not.toHaveBeenCalled();
      expect(mockPrismaService.operator.count).not.toHaveBeenCalled();

      expect(result.status).toBe('unhealthy');
      expect(result.database.status).toBe('disconnected');
      expect(result.database.error).toBe('Database connection failed');

      expect(result.memory).toHaveProperty('used');
      expect(result.memory).toHaveProperty('total');
      expect(result.memory).toHaveProperty('unit', 'MB');

      expect(result.system).toHaveProperty('platform');
      expect(result.system).toHaveProperty('arch');
      expect(result.system).toHaveProperty('nodeVersion');
      expect(result.system).toHaveProperty('pid');

      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('environment');
      expect(result).toHaveProperty('version');
    });
  });
});
