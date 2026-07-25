import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const logger = new Logger('SeedCLI');
  logger.log('🌱 Starting database seeding script...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  try {
    await seedService.seedAdminUser();
    logger.log('✅ Database seeding finished successfully.');
  } catch (error) {
    logger.error('❌ Seeding failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
