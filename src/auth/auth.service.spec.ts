import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    operator: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateOperator', () => {
    it('should return operator without password when credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const operator = {
        id: '1',
        name: 'Test Operator',
        email,
        password: hashedPassword,
        identification: '1234567890',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.operator.findUnique.mockResolvedValue(operator);

      const result = await service.validateOperator(email, password);

      expect(mockPrismaService.operator.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toEqual({
        id: '1',
        name: 'Test Operator',
        email,
        identification: '1234567890',
        phone: '123456789',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('login', () => {
    it('should return access token and operator info on successful login', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const operator = {
        id: '1',
        name: 'Test Operator',
        email: 'test@example.com',
        identification: '1234567890',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.operator.findUnique.mockResolvedValue({
        ...operator,
        password: hashedPassword,
      });
      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        access_token: 'jwt-token',
        operator: {
          id: '1',
          name: 'Test Operator',
          email: 'test@example.com',
          identification: '1234567890',
        },
      });
    });
  });

  describe('register', () => {
    it('should create new operator and return operator info', async () => {
      const registerDto = {
        name: 'Test Operator',
        email: 'test@example.com',
        phone: '123456789',
        identification: '1234567890',
        password: 'password123',
      };

      const createdOperator = {
        id: '1',
        name: 'Test Operator',
        email: 'test@example.com',
        identification: '1234567890',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.operator.findFirst.mockResolvedValue(null);
      mockPrismaService.operator.create.mockResolvedValue(createdOperator);

      const result = await service.register(registerDto);

      expect(mockPrismaService.operator.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [
            { email: registerDto.email },
            { identification: registerDto.identification },
          ],
        },
      });
      expect(mockPrismaService.operator.create).toHaveBeenCalled();
      expect(result).toEqual(createdOperator);
    });
  });
});
