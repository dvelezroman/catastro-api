import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OperatorsModule } from './operators/operators.module';
import { OwnersModule } from './owners/owners.module';
import { RecipesModule } from './recipes/recipes.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantsModule,
    OperatorsModule,
    OwnersModule,
    RecipesModule,
    HealthModule,
  ],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
