import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    const operator = await this.prisma.operator.findUnique({
      where: { id: payload.sub },
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
      throw new UnauthorizedException('Invalid token');
    }

    return operator;
  }
}
