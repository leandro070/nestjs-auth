import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { getConfigLogger } from './config/logger';
import { configSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getConfigLogger(),
  });

  configSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
