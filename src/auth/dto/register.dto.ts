import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
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

  @ApiProperty({
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
