import { CreateOperatorDto, UpdateOperatorDto } from '../operator.dto';

describe('Operator DTOs', () => {
  describe('CreateOperatorDto', () => {
    it('should create a valid CreateOperatorDto', () => {
      const dto = new CreateOperatorDto();
      dto.name = 'Test Operator';
      dto.email = 'test@example.com';
      dto.phone = '123456789';

      expect(dto.name).toBe('Test Operator');
      expect(dto.email).toBe('test@example.com');
      expect(dto.phone).toBe('123456789');
    });

    it('should create a minimal CreateOperatorDto with only required fields', () => {
      const dto = new CreateOperatorDto();
      dto.name = 'Test Operator';
      dto.email = 'test@example.com';

      expect(dto.name).toBe('Test Operator');
      expect(dto.email).toBe('test@example.com');
      expect(dto.phone).toBeUndefined();
    });
  });

  describe('UpdateOperatorDto', () => {
    it('should create a valid UpdateOperatorDto', () => {
      const dto = new UpdateOperatorDto();
      dto.name = 'Updated Operator';
      dto.email = 'updated@example.com';
      dto.phone = '987654321';

      expect(dto.name).toBe('Updated Operator');
      expect(dto.email).toBe('updated@example.com');
      expect(dto.phone).toBe('987654321');
    });

    it('should create an empty UpdateOperatorDto', () => {
      const dto = new UpdateOperatorDto();

      expect(dto.name).toBeUndefined();
      expect(dto.email).toBeUndefined();
      expect(dto.phone).toBeUndefined();
    });

    it('should create a partial UpdateOperatorDto', () => {
      const dto = new UpdateOperatorDto();
      dto.name = 'Updated Operator';

      expect(dto.name).toBe('Updated Operator');
      expect(dto.email).toBeUndefined();
      expect(dto.phone).toBeUndefined();
    });
  });
});
