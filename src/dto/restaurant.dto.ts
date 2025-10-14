import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Restaurant name',
    example: 'El Buen Sabor',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Short description of the restaurant',
    example: 'Restaurante familiar con comida tradicional',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Detailed history/description for web presentation',
    example: 'Fundado en 1985 por la familia González...',
  })
  history?: string;

  @ApiProperty({
    description: 'Restaurant address',
    example: 'Av. Principal 123, Portoviejo',
  })
  address: string;

  @ApiProperty({
    description: 'Latitude coordinate',
    example: -1.0547,
  })
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate',
    example: -80.4545,
  })
  longitude: number;

  @ApiPropertyOptional({
    description: 'Restaurant phone number',
    example: '(05) 2638-1234',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Restaurant email',
    example: 'contacto@elbuensabor.ec',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Restaurant website URL',
    example: 'https://elbuensabor.ec',
  })
  website?: string;

  @ApiPropertyOptional({
    description: 'Main restaurant image URL',
    example: 'https://example.com/restaurant-main.jpg',
  })
  principalImage?: string;

  @ApiPropertyOptional({
    description: 'Array of additional image URLs',
    example: [
      'https://example.com/restaurant-1.jpg',
      'https://example.com/restaurant-2.jpg',
    ],
    type: [String],
  })
  images?: string[];

  @ApiPropertyOptional({
    description: 'Business identification number',
    example: '1234567890',
  })
  identificationNumber?: string;

  @ApiPropertyOptional({
    description: 'Owner ID',
    example: 'owner-id-123',
  })
  ownerId?: string;
}

export class UpdateRestaurantDto {
  @ApiPropertyOptional({
    description: 'Restaurant name',
    example: 'El Buen Sabor',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Short description of the restaurant',
    example: 'Restaurante familiar con comida tradicional',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Detailed history/description for web presentation',
    example: 'Fundado en 1985 por la familia González...',
  })
  history?: string;

  @ApiPropertyOptional({
    description: 'Restaurant address',
    example: 'Av. Principal 123, Portoviejo',
  })
  address?: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: -1.0547,
  })
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: -80.4545,
  })
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Restaurant phone number',
    example: '(05) 2638-1234',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Restaurant email',
    example: 'contacto@elbuensabor.ec',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Restaurant website URL',
    example: 'https://elbuensabor.ec',
  })
  website?: string;

  @ApiPropertyOptional({
    description: 'Main restaurant image URL',
    example: 'https://example.com/restaurant-main.jpg',
  })
  principalImage?: string;

  @ApiPropertyOptional({
    description: 'Array of additional image URLs',
    example: [
      'https://example.com/restaurant-1.jpg',
      'https://example.com/restaurant-2.jpg',
    ],
    type: [String],
  })
  images?: string[];

  @ApiPropertyOptional({
    description: 'Business identification number',
    example: '1234567890',
  })
  identificationNumber?: string;

  @ApiPropertyOptional({
    description: 'Owner ID',
    example: 'owner-id-123',
  })
  ownerId?: string;
}

export class CreateRestaurantWithOwnerDto {
  @ApiProperty({
    description: 'Restaurant data',
    type: CreateRestaurantDto,
  })
  restaurant: CreateRestaurantDto;

  @ApiProperty({
    description: 'Owner data',
    type: 'object',
    properties: {
      name: { type: 'string', example: 'María González' },
      email: { type: 'string', example: 'maria.gonzalez@email.com' },
      phone: { type: 'string', example: '(05) 2638-5678' },
      address: { type: 'string', example: 'Calle Secundaria 456, Portoviejo' },
    },
  })
  owner: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };

  @ApiProperty({
    description: 'Array of recipe IDs to associate with the restaurant',
    example: ['recipe-id-1', 'recipe-id-2', 'recipe-id-3'],
    type: [String],
  })
  recipeIds: string[];
}
