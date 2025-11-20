import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Set global prefix
  app.setGlobalPrefix('api');

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Pawn AI API')
    .setDescription('API Documentation for Pawn AI - Intelligent Pawn Shop Management System')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('pawns', 'Pawn transactions')
    .addTag('customers', 'Customer management')
    .addTag('gold-prices', 'Gold price tracking')
    .addTag('forfeited-assets', 'Forfeited assets management')
    .addTag('ml', 'Machine Learning predictions')
    .addTag('llm', 'LLM chatbot integration')
    .addTag('analytics', 'Business analytics')
    .addTag('external-api', 'External API integrations (BOT, Gold prices, etc.)')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Pawn AI API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // Extract port from BACKEND_PORT URL
  const backendUrl = process.env.BACKEND_PORT;
  const port = backendUrl.split(':').pop() || '3002';

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();