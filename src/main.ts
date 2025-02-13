import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WarningFilter } from './errors/WarningFilters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new WarningFilter());
  app.enableCors();
  await app.listen(process.env.APP_PORT || 3001);
}
bootstrap();