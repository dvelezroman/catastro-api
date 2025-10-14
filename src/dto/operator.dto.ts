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
}
