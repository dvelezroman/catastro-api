import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOperatorDto {
  @ApiProperty({
    description: 'Operator full name',
    example: 'Carlos Mendoza',
  })
  name: string;

  @ApiProperty({
    description: 'Operator email address',
    example: 'carlos.mendoza@portoviejo.ec',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Operator phone number',
    example: '(05) 2638-111',
  })
  phone?: string;

  @ApiProperty({
    description: 'Operator identification number',
    example: '1234567890',
  })
  identification: string;

  @ApiProperty({
    description: 'Operator password',
    example: 'securePassword123',
  })
  password: string;
}

export class UpdateOperatorDto {
  @ApiPropertyOptional({
    description: 'Operator full name',
    example: 'Carlos Mendoza',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Operator email address',
    example: 'carlos.mendoza@portoviejo.ec',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Operator phone number',
    example: '(05) 2638-111',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Operator identification number',
    example: '1234567890',
  })
  identification?: string;

  @ApiPropertyOptional({
    description: 'Operator password',
    example: 'newSecurePassword123',
  })
  password?: string;
}
