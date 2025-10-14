import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsService } from '../operators.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('OperatorsService', () => {
  let service: OperatorsService;

  const mockPrismaService = {
    operator: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperatorsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OperatorsService>(OperatorsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an operator', async () => {
      const operatorData: Prisma.OperatorCreateInput = {
        name: 'Test Operator',
        email: 'test@example.com',
        phone: '123456789',
      };

      const expectedOperator = {
        id: '1',
        ...operatorData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.operator.create.mockResolvedValue(expectedOperator);

      const result = await service.create(operatorData);

      expect(mockPrismaService.operator.create).toHaveBeenCalledWith({
        data: operatorData,
      });
      expect(result).toEqual(expectedOperator);
    });
  });

  describe('findAll', () => {
    it('should return all operators', async () => {
      const expectedOperators = [
        {
          id: '1',
          name: 'Operator 1',
          email: 'operator1@example.com',
          phone: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Operator 2',
          email: 'operator2@example.com',
          phone: '987654321',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.operator.findMany.mockResolvedValue(expectedOperators);

      const result = await service.findAll();

      expect(mockPrismaService.operator.findMany).toHaveBeenCalled();
      expect(result).toEqual(expectedOperators);
    });
  });

  describe('findOne', () => {
    it('should return an operator by id', async () => {
      const operatorId = '1';
      const expectedOperator = {
        id: operatorId,
        name: 'Test Operator',
        email: 'test@example.com',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.operator.findUnique.mockResolvedValue(expectedOperator);

      const result = await service.findOne(operatorId);

      expect(mockPrismaService.operator.findUnique).toHaveBeenCalledWith({
        where: { id: operatorId },
      });
      expect(result).toEqual(expectedOperator);
    });

    it('should return null if operator not found', async () => {
      const operatorId = '999';
      mockPrismaService.operator.findUnique.mockResolvedValue(null);

      const result = await service.findOne(operatorId);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an operator', async () => {
      const operatorId = '1';
      const updateData: Prisma.OperatorUpdateInput = {
        name: 'Updated Operator',
        phone: '987654321',
      };

      const expectedOperator = {
        id: operatorId,
        name: 'Updated Operator',
        email: 'test@example.com',
        phone: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.operator.update.mockResolvedValue(expectedOperator);

      const result = await service.update(operatorId, updateData);

      expect(mockPrismaService.operator.update).toHaveBeenCalledWith({
        where: { id: operatorId },
        data: updateData,
      });
      expect(result).toEqual(expectedOperator);
    });
  });

  describe('remove', () => {
    it('should delete an operator', async () => {
      const operatorId = '1';
      const expectedOperator = {
        id: operatorId,
        name: 'Test Operator',
        email: 'test@example.com',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.operator.delete.mockResolvedValue(expectedOperator);

      const result = await service.remove(operatorId);

      expect(mockPrismaService.operator.delete).toHaveBeenCalledWith({
        where: { id: operatorId },
      });
      expect(result).toEqual(expectedOperator);
    });
  });
});
