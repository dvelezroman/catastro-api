import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Recipe name',
    example: 'Ceviche de Camarón',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Recipe description',
    example: 'Ceviche fresco con camarones del día',
  })
  description?: string;
}

export class UpdateRecipeDto {
  @ApiPropertyOptional({
    description: 'Recipe name',
    example: 'Ceviche de Camarón',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Recipe description',
    example: 'Ceviche fresco con camarones del día',
  })
  description?: string;
}
