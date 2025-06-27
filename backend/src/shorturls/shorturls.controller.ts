import { Controller, Get, Post, Body, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ShorturlsService } from './shorturls.service';
import { CreateShortUrlDto, ShortUrlResponseDto, ShortUrlStatsDto } from './shorturl.dto';
import { logger } from '../../../logger-middleware';

@Controller()
export class ShorturlsController {
  constructor(private readonly shorturlsService: ShorturlsService) {}

  @Post('shorturls')
  create(@Body() createShortUrlDto: CreateShortUrlDto): ShortUrlResponseDto {
    try {
      logger.info('backend', 'shorturl-controller', 'Creating short URL', { 
        url: createShortUrlDto.url 
      });
      return this.shorturlsService.create(createShortUrlDto);
    } catch (error) {
      logger.error('backend', 'shorturl-controller', 'Error creating short URL', { 
        error: error.message 
      });
      throw error;
    }
  }

  @Get('shorturls/:shortCode/stats')
  getStats(@Param('shortCode') shortCode: string): ShortUrlStatsDto {
    try {
      logger.info('backend', 'shorturl-controller', 'Getting stats', { shortCode });
      return this.shorturlsService.getStats(shortCode);
    } catch (error) {
      logger.error('backend', 'shorturl-controller', 'Error getting stats', { 
        shortCode, 
        error: error.message 
      });
      throw error;
    }
  }

  // This handles the redirect - put it LAST
  @Get(':shortCode')
  async redirect(
    @Param('shortCode') shortCode: string, 
    @Req() req: Request, 
    @Res() res: Response
  ) {
    try {
      logger.info('backend', 'shorturl-controller', 'Attempting redirect', { shortCode });
      const originalUrl = this.shorturlsService.redirect(shortCode, req);
      logger.info('backend', 'shorturl-controller', 'Redirecting to', { originalUrl });
      return res.redirect(originalUrl);
    } catch (error) {
      logger.error('backend', 'shorturl-controller', 'Redirect failed', { 
        shortCode, 
        error: error.message 
      });
      return res.status(404).json({ 
        message: `Short URL '${shortCode}' not found or expired`,
        error: error.message 
      });
    }
  }
}