import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '../../logger-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  logger.info('backend', 'main', 'Backend started', { port: 3001 });
}
bootstrap();