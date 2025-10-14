import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsController } from '../operators.controller';
import { OperatorsService } from '../operators.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('OperatorsController', () => {
  let controller: OperatorsController;

  const mockOperatorsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperatorsController],
      providers: [
        {
          provide: OperatorsService,
          useValue: mockOperatorsService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<OperatorsController>(OperatorsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create when POST /operators', async () => {
    const operatorData = {
      name: 'Test Operator',
      email: 'test@example.com',
      phone: '123456789',
    };

    const expectedResult = { id: '1', ...operatorData };
    mockOperatorsService.create.mockResolvedValue(expectedResult);

    const result = await controller.create(operatorData);

    expect(mockOperatorsService.create).toHaveBeenCalledWith(operatorData);
    expect(result).toEqual(expectedResult);
  });

  it('should call service.findAll when GET /operators', async () => {
    const expectedResult = [{ id: '1', name: 'Test Operator' }];
    mockOperatorsService.findAll.mockResolvedValue(expectedResult);

    const result = await controller.findAll();

    expect(mockOperatorsService.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should call service.findOne when GET /operators/:id', async () => {
    const operatorId = '1';
    const expectedResult = { id: operatorId, name: 'Test Operator' };
    mockOperatorsService.findOne.mockResolvedValue(expectedResult);

    const result = await controller.findOne(operatorId);

    expect(mockOperatorsService.findOne).toHaveBeenCalledWith(operatorId);
    expect(result).toEqual(expectedResult);
  });
});
