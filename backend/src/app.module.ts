import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShorturlsModule } from './shorturls/shorturls.module';
import { logger } from '../../logger-middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ShorturlsModule,
  ],
  providers: [
    {
      provide: 'LOGGER',
      useValue: logger,
    },
  ],
})
export class AppModule {}