import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  CreateRestaurantWithOwnerDto,
} from '../restaurant.dto';

describe('Restaurant DTOs', () => {
  describe('CreateRestaurantDto', () => {
    it('should create a valid CreateRestaurantDto', () => {
      const dto = new CreateRestaurantDto();
      dto.name = 'Test Restaurant';
      dto.description = 'Test Description';
      dto.history = 'Test History';
      dto.address = 'Test Address';
      dto.latitude = 0.0;
      dto.longitude = 0.0;
      dto.phone = '123456789';
      dto.email = 'test@example.com';
      dto.website = 'https://example.com';
      dto.principalImage = 'https://example.com/image.jpg';
      dto.images = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ];
      dto.identificationNumber = '1234567890';
      dto.ownerId = 'owner-123';

      expect(dto.name).toBe('Test Restaurant');
      expect(dto.description).toBe('Test Description');
      expect(dto.history).toBe('Test History');
      expect(dto.address).toBe('Test Address');
      expect(dto.latitude).toBe(0.0);
      expect(dto.longitude).toBe(0.0);
      expect(dto.phone).toBe('123456789');
      expect(dto.email).toBe('test@example.com');
      expect(dto.website).toBe('https://example.com');
      expect(dto.principalImage).toBe('https://example.com/image.jpg');
      expect(dto.images).toEqual([
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ]);
      expect(dto.identificationNumber).toBe('1234567890');
      expect(dto.ownerId).toBe('owner-123');
    });

    it('should create a minimal CreateRestaurantDto with only required fields', () => {
      const dto = new CreateRestaurantDto();
      dto.name = 'Test Restaurant';
      dto.address = 'Test Address';
      dto.latitude = 0.0;
      dto.longitude = 0.0;

      expect(dto.name).toBe('Test Restaurant');
      expect(dto.address).toBe('Test Address');
      expect(dto.latitude).toBe(0.0);
      expect(dto.longitude).toBe(0.0);
      expect(dto.description).toBeUndefined();
      expect(dto.history).toBeUndefined();
      expect(dto.phone).toBeUndefined();
      expect(dto.email).toBeUndefined();
      expect(dto.website).toBeUndefined();
      expect(dto.principalImage).toBeUndefined();
      expect(dto.images).toBeUndefined();
      expect(dto.identificationNumber).toBeUndefined();
      expect(dto.ownerId).toBeUndefined();
    });
  });

  describe('UpdateRestaurantDto', () => {
    it('should create a valid UpdateRestaurantDto', () => {
      const dto = new UpdateRestaurantDto();
      dto.name = 'Updated Restaurant';
      dto.description = 'Updated Description';
      dto.history = 'Updated History';
      dto.address = 'Updated Address';
      dto.latitude = 1.0;
      dto.longitude = 1.0;
      dto.phone = '987654321';
      dto.email = 'updated@example.com';
      dto.website = 'https://updated.com';
      dto.principalImage = 'https://updated.com/image.jpg';
      dto.images = ['https://updated.com/image1.jpg'];
      dto.identificationNumber = '0987654321';
      dto.ownerId = 'owner-456';

      expect(dto.name).toBe('Updated Restaurant');
      expect(dto.description).toBe('Updated Description');
      expect(dto.history).toBe('Updated History');
      expect(dto.address).toBe('Updated Address');
      expect(dto.latitude).toBe(1.0);
      expect(dto.longitude).toBe(1.0);
      expect(dto.phone).toBe('987654321');
      expect(dto.email).toBe('updated@example.com');
      expect(dto.website).toBe('https://updated.com');
      expect(dto.principalImage).toBe('https://updated.com/image.jpg');
      expect(dto.images).toEqual(['https://updated.com/image1.jpg']);
      expect(dto.identificationNumber).toBe('0987654321');
      expect(dto.ownerId).toBe('owner-456');
    });

    it('should create an empty UpdateRestaurantDto', () => {
      const dto = new UpdateRestaurantDto();

      expect(dto.name).toBeUndefined();
      expect(dto.description).toBeUndefined();
      expect(dto.history).toBeUndefined();
      expect(dto.address).toBeUndefined();
      expect(dto.latitude).toBeUndefined();
      expect(dto.longitude).toBeUndefined();
      expect(dto.phone).toBeUndefined();
      expect(dto.email).toBeUndefined();
      expect(dto.website).toBeUndefined();
      expect(dto.principalImage).toBeUndefined();
      expect(dto.images).toBeUndefined();
      expect(dto.identificationNumber).toBeUndefined();
      expect(dto.ownerId).toBeUndefined();
    });
  });

  describe('CreateRestaurantWithOwnerDto', () => {
    it('should create a valid CreateRestaurantWithOwnerDto', () => {
      const dto = new CreateRestaurantWithOwnerDto();

      dto.restaurant = {
        name: 'Test Restaurant',
        address: 'Test Address',
        latitude: 0.0,
        longitude: 0.0,
        description: 'Test Description',
        history: 'Test History',
        phone: '123456789',
        email: 'test@example.com',
        website: 'https://example.com',
        principalImage: 'https://example.com/image.jpg',
        images: ['https://example.com/image1.jpg'],
        identificationNumber: '1234567890',
      };

      dto.owner = {
        name: 'Test Owner',
        email: 'owner@example.com',
        phone: '987654321',
        address: 'Owner Address',
      };

      dto.recipeIds = ['recipe-1', 'recipe-2', 'recipe-3'];

      expect(dto.restaurant.name).toBe('Test Restaurant');
      expect(dto.restaurant.address).toBe('Test Address');
      expect(dto.restaurant.latitude).toBe(0.0);
      expect(dto.restaurant.longitude).toBe(0.0);
      expect(dto.owner.name).toBe('Test Owner');
      expect(dto.owner.email).toBe('owner@example.com');
      expect(dto.owner.phone).toBe('987654321');
      expect(dto.owner.address).toBe('Owner Address');
      expect(dto.recipeIds).toEqual(['recipe-1', 'recipe-2', 'recipe-3']);
    });

    it('should create a minimal CreateRestaurantWithOwnerDto', () => {
      const dto = new CreateRestaurantWithOwnerDto();

      dto.restaurant = {
        name: 'Test Restaurant',
        address: 'Test Address',
        latitude: 0.0,
        longitude: 0.0,
      };

      dto.owner = {
        name: 'Test Owner',
        email: 'owner@example.com',
      };

      dto.recipeIds = [];

      expect(dto.restaurant.name).toBe('Test Restaurant');
      expect(dto.restaurant.address).toBe('Test Address');
      expect(dto.restaurant.latitude).toBe(0.0);
      expect(dto.restaurant.longitude).toBe(0.0);
      expect(dto.owner.name).toBe('Test Owner');
      expect(dto.owner.email).toBe('owner@example.com');
      expect(dto.owner.phone).toBeUndefined();
      expect(dto.owner.address).toBeUndefined();
      expect(dto.recipeIds).toEqual([]);
    });
  });
});
