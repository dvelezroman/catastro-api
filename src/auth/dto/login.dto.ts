import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Operator email address',
    example: 'carlos.mendoza@portoviejo.ec',
  })
  email: string;

  @ApiProperty({
    description: 'Operator password',
    example: 'securePassword123',
  })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Operator information',
    example: {
      id: 'operator-123',
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@portoviejo.ec',
      identification: '1234567890',
    },
  })
  operator: {
    id: string;
    name: string;
    email: string;
    identification: string;
  };
}
