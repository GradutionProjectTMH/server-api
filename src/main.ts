import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: getCorsOrigins(), credentials: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  // SwaggerModule
  const config = new DocumentBuilder()
    .setTitle('Core NestJs')
    .setDescription('none')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  if (process.env.NODE_ENV == 'development') {
    mongoose.set('debug', true);
  }

  await app.listen(PORT);
  console.log(`Server started on port: ${PORT}`);
}
bootstrap();

function getCorsOrigins(): Array<string> | string {
  const origins = process.env.CORS_ORIGINS;
  if (!origins) return '*';

  return origins.split(',').map((origin) => origin.trim());
}
