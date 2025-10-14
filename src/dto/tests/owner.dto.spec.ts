import { CreateOwnerDto, UpdateOwnerDto } from '../owner.dto';

describe('Owner DTOs', () => {
  describe('CreateOwnerDto', () => {
    it('should create a valid CreateOwnerDto', () => {
      const dto = new CreateOwnerDto();
      dto.name = 'Test Owner';
      dto.email = 'test@example.com';
      dto.phone = '123456789';
      dto.address = 'Test Address';

      expect(dto.name).toBe('Test Owner');
      expect(dto.email).toBe('test@example.com');
      expect(dto.phone).toBe('123456789');
      expect(dto.address).toBe('Test Address');
    });

    it('should create a minimal CreateOwnerDto with only required fields', () => {
      const dto = new CreateOwnerDto();
      dto.name = 'Test Owner';
      dto.email = 'test@example.com';

      expect(dto.name).toBe('Test Owner');
      expect(dto.email).toBe('test@example.com');
      expect(dto.phone).toBeUndefined();
      expect(dto.address).toBeUndefined();
    });
  });

  describe('UpdateOwnerDto', () => {
    it('should create a valid UpdateOwnerDto', () => {
      const dto = new UpdateOwnerDto();
      dto.name = 'Updated Owner';
      dto.email = 'updated@example.com';
      dto.phone = '987654321';
      dto.address = 'Updated Address';

      expect(dto.name).toBe('Updated Owner');
      expect(dto.email).toBe('updated@example.com');
      expect(dto.phone).toBe('987654321');
      expect(dto.address).toBe('Updated Address');
    });

    it('should create an empty UpdateOwnerDto', () => {
      const dto = new UpdateOwnerDto();

      expect(dto.name).toBeUndefined();
      expect(dto.email).toBeUndefined();
      expect(dto.phone).toBeUndefined();
      expect(dto.address).toBeUndefined();
    });

    it('should create a partial UpdateOwnerDto', () => {
      const dto = new UpdateOwnerDto();
      dto.name = 'Updated Owner';
      dto.phone = '987654321';

      expect(dto.name).toBe('Updated Owner');
      expect(dto.email).toBeUndefined();
      expect(dto.phone).toBe('987654321');
      expect(dto.address).toBeUndefined();
    });
  });
});
