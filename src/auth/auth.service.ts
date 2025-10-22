import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateOperator(email: string, password: string) {
    const operator = await this.prisma.operator.findUnique({
      where: { email },
    });

    if (!operator) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, operator.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = operator;
    return result;
  }

  async login(loginDto: LoginDto) {
    const operator = await this.validateOperator(
      loginDto.email,
      loginDto.password,
    );

    const payload = {
      email: operator.email,
      sub: operator.id,
      identification: operator.identification,
    };

    return {
      access_token: this.jwtService.sign(payload),
      operator: {
        id: operator.id,
        name: operator.name,
        email: operator.email,
        identification: operator.identification,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if operator already exists
    const existingOperator = await this.prisma.operator.findFirst({
      where: {
        OR: [
          { email: registerDto.email },
          { identification: registerDto.identification },
        ],
      },
    });

    if (existingOperator) {
      throw new ConflictException(
        'Operator with this email or identification already exists',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create operator
    const operator = await this.prisma.operator.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        phone: registerDto.phone,
        identification: registerDto.identification,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        identification: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return operator;
  }

  async getProfile(operatorId: string) {
    const operator = await this.prisma.operator.findUnique({
      where: { id: operatorId },
      select: {
        id: true,
        name: true,
        email: true,
        identification: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!operator) {
      throw new UnauthorizedException('Operator not found');
    }

    return operator;
  }
}
