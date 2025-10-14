import { Test, TestingModule } from '@nestjs/testing';
import { OwnersService } from '../owners.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('OwnersService', () => {
  let service: OwnersService;

  const mockPrismaService = {
    owner: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    restaurant: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OwnersService>(OwnersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an owner', async () => {
      const ownerData: Prisma.OwnerCreateInput = {
        name: 'Test Owner',
        email: 'test@example.com',
        phone: '123456789',
      };

      const expectedOwner = {
        id: '1',
        ...ownerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.owner.create.mockResolvedValue(expectedOwner);

      const result = await service.create(ownerData);

      expect(mockPrismaService.owner.create).toHaveBeenCalledWith({
        data: ownerData,
      });
      expect(result).toEqual(expectedOwner);
    });
  });

  describe('findAll', () => {
    it('should return all owners with restaurants', async () => {
      const expectedOwners = [
        {
          id: '1',
          name: 'Owner 1',
          email: 'owner1@example.com',
          phone: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
          restaurants: [],
        },
        {
          id: '2',
          name: 'Owner 2',
          email: 'owner2@example.com',
          phone: '987654321',
          createdAt: new Date(),
          updatedAt: new Date(),
          restaurants: [],
        },
      ];

      mockPrismaService.owner.findMany.mockResolvedValue(expectedOwners);

      const result = await service.findAll();

      expect(mockPrismaService.owner.findMany).toHaveBeenCalledWith({
        include: {
          restaurants: true,
        },
      });
      expect(result).toEqual(expectedOwners);
    });
  });

  describe('findOne', () => {
    it('should return an owner by id with restaurants', async () => {
      const ownerId = '1';
      const expectedOwner = {
        id: ownerId,
        name: 'Test Owner',
        email: 'test@example.com',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
        restaurants: [],
      };

      mockPrismaService.owner.findUnique.mockResolvedValue(expectedOwner);

      const result = await service.findOne(ownerId);

      expect(mockPrismaService.owner.findUnique).toHaveBeenCalledWith({
        where: { id: ownerId },
        include: {
          restaurants: true,
        },
      });
      expect(result).toEqual(expectedOwner);
    });

    it('should return null if owner not found', async () => {
      const ownerId = '999';
      mockPrismaService.owner.findUnique.mockResolvedValue(null);

      const result = await service.findOne(ownerId);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an owner', async () => {
      const ownerId = '1';
      const updateData: Prisma.OwnerUpdateInput = {
        name: 'Updated Owner',
        phone: '987654321',
      };

      const expectedOwner = {
        id: ownerId,
        name: 'Updated Owner',
        email: 'test@example.com',
        phone: '987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
        restaurants: [],
      };

      mockPrismaService.owner.update.mockResolvedValue(expectedOwner);

      const result = await service.update(ownerId, updateData);

      expect(mockPrismaService.owner.update).toHaveBeenCalledWith({
        where: { id: ownerId },
        data: updateData,
        include: {
          restaurants: true,
        },
      });
      expect(result).toEqual(expectedOwner);
    });
  });

  describe('remove', () => {
    it('should delete an owner', async () => {
      const ownerId = '1';
      const expectedOwner = {
        id: ownerId,
        name: 'Test Owner',
        email: 'test@example.com',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.owner.delete.mockResolvedValue(expectedOwner);

      const result = await service.remove(ownerId);

      expect(mockPrismaService.owner.delete).toHaveBeenCalledWith({
        where: { id: ownerId },
      });
      expect(result).toEqual(expectedOwner);
    });
  });

  describe('getRestaurantsByOwner', () => {
    it('should return restaurants owned by specific owner', async () => {
      const ownerId = '1';
      const expectedRestaurants = [
        {
          id: '1',
          name: 'Restaurant 1',
          address: 'Address 1',
          latitude: 0,
          longitude: 0,
          ownerId,
          createdAt: new Date(),
          updatedAt: new Date(),
          restaurantRecipes: [],
        },
        {
          id: '2',
          name: 'Restaurant 2',
          address: 'Address 2',
          latitude: 0,
          longitude: 0,
          ownerId,
          createdAt: new Date(),
          updatedAt: new Date(),
          restaurantRecipes: [],
        },
      ];

      mockPrismaService.restaurant.findMany.mockResolvedValue(
        expectedRestaurants,
      );

      const result = await service.getRestaurantsByOwner(ownerId);

      expect(mockPrismaService.restaurant.findMany).toHaveBeenCalledWith({
        where: { ownerId },
        include: {
          restaurantRecipes: {
            include: {
              recipe: true,
            },
          },
        },
      });
      expect(result).toEqual(expectedRestaurants);
    });
  });
});
