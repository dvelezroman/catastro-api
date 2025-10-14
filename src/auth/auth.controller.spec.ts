import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with loginDto', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult = {
        access_token: 'jwt-token',
        operator: {
          id: '1',
          name: 'Test Operator',
          email: 'test@example.com',
          identification: '1234567890',
        },
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('register', () => {
    it('should call authService.register with registerDto', async () => {
      const registerDto = {
        name: 'Test Operator',
        email: 'test@example.com',
        phone: '123456789',
        identification: '1234567890',
        password: 'password123',
      };

      const expectedResult = {
        id: '1',
        name: 'Test Operator',
        email: 'test@example.com',
        identification: '1234567890',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(registerDto);

      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getProfile', () => {
    it('should call authService.getProfile with user id', async () => {
      const user = { id: '1' };
      const expectedResult = {
        id: '1',
        name: 'Test Operator',
        email: 'test@example.com',
        identification: '1234567890',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAuthService.getProfile.mockResolvedValue(expectedResult);

      const result = await controller.getProfile({ user });

      expect(mockAuthService.getProfile).toHaveBeenCalledWith('1');
      expect(result).toEqual(expectedResult);
    });
  });
});
