import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOwnerDto {
  @ApiProperty({
    description: 'Owner full name',
    example: 'María González',
  })
  name: string;

  @ApiProperty({
    description: 'Owner email address',
    example: 'maria.gonzalez@email.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Owner phone number',
    example: '(05) 2638-5678',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Owner address',
    example: 'Calle Secundaria 456, Portoviejo',
  })
  address?: string;
}

export class UpdateOwnerDto {
  @ApiPropertyOptional({
    description: 'Owner full name',
    example: 'María González',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Owner email address',
    example: 'maria.gonzalez@email.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Owner phone number',
    example: '(05) 2638-5678',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Owner address',
    example: 'Calle Secundaria 456, Portoviejo',
  })
  address?: string;
}
