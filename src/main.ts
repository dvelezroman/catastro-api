import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'error', 'warn'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3300;

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // patch to remove header when unsupported utf-8 value arrives
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers['content-encoding']?.toString().toLowerCase() === 'utf-8') {
      delete req.headers['content-encoding'];
    }
    next();
  });

  app.useGlobalPipes(new ValidationPipe());
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Catastro Local API')
    .setDescription(
      'API for managing restaurants, owners, recipes, and operators in the Catastro Local system',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Catastro Local API Documentation',
  });

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(
    `📚 API Documentation available at: http://localhost:${port}/api/docs`,
  );
}
bootstrap();
