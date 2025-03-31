import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { customLogger } from './commons/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);
  customLogger.log(`La aplicación está corriendo en: http://localhost:${port}`);
}
bootstrap();
