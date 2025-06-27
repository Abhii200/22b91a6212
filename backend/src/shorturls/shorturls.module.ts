import { Module } from '@nestjs/common';
import { ShorturlsController } from './shorturls.controller';
import { ShorturlsService } from './shorturls.service';
import { logger } from '../../../logger-middleware';

@Module({
  controllers: [ShorturlsController],
  providers: [
    ShorturlsService,
    {
      provide: 'LOGGER',
      useValue: logger,
    },
  ],
})
export class ShorturlsModule {}