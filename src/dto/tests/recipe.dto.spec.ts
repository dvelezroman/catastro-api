import { CreateRecipeDto, UpdateRecipeDto } from '../recipe.dto';

describe('Recipe DTOs', () => {
  describe('CreateRecipeDto', () => {
    it('should create a valid CreateRecipeDto', () => {
      const dto = new CreateRecipeDto();
      dto.name = 'Test Recipe';
      dto.description = 'Test Description';

      expect(dto.name).toBe('Test Recipe');
      expect(dto.description).toBe('Test Description');
    });

    it('should create a minimal CreateRecipeDto with only required fields', () => {
      const dto = new CreateRecipeDto();
      dto.name = 'Test Recipe';

      expect(dto.name).toBe('Test Recipe');
      expect(dto.description).toBeUndefined();
    });
  });

  describe('UpdateRecipeDto', () => {
    it('should create a valid UpdateRecipeDto', () => {
      const dto = new UpdateRecipeDto();
      dto.name = 'Updated Recipe';
      dto.description = 'Updated Description';

      expect(dto.name).toBe('Updated Recipe');
      expect(dto.description).toBe('Updated Description');
    });

    it('should create an empty UpdateRecipeDto', () => {
      const dto = new UpdateRecipeDto();

      expect(dto.name).toBeUndefined();
      expect(dto.description).toBeUndefined();
    });

    it('should create a partial UpdateRecipeDto', () => {
      const dto = new UpdateRecipeDto();
      dto.name = 'Updated Recipe';

      expect(dto.name).toBe('Updated Recipe');
      expect(dto.description).toBeUndefined();
    });
  });
});
