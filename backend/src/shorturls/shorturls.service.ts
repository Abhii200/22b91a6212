import { Injectable, Inject } from '@nestjs/common';
import { ShortUrl } from './shorturl.entity';
import {
  CreateShortUrlDto,
  ShortUrlResponseDto,
  ShortUrlStatsDto,
} from './shorturl.dto';
import { Logger } from '../../../logger-middleware';
import { customAlphabet } from 'nanoid';

@Injectable()
export class ShorturlsService {
  private readonly urls: Map<string, ShortUrl> = new Map();
  private readonly nanoid = customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    6,
  );

  constructor(@Inject('LOGGER') private readonly logger: Logger) {}

  create(createShortUrlDto: CreateShortUrlDto): ShortUrlResponseDto {
    const { url, validity = 30, shortcode } = createShortUrlDto;
    
    let shortCode = shortcode;
    if (!shortCode) {
      shortCode = this.nanoid();
    } else if (this.urls.has(shortCode)) {
      this.logger.error('backend', 'shorturl-service', 'Shortcode collision', { shortcode });
      throw new Error('Shortcode already exists');
    }

    const shortUrl = new ShortUrl(this.logger, url, shortCode, validity);
    this.urls.set(shortCode, shortUrl);

    this.logger.info('backend', 'shorturl-service', 'Short URL created', {
      shortCode,
      originalUrl: url,
      validity,
    });

    return {
      shortLink: `http://localhost:3001/${shortCode}`,
      expiry: shortUrl.expiry.toISOString(),
    };
  }

  redirect(shortCode: string, req: any): string {
    const shortUrl = this.urls.get(shortCode);
    if (!shortUrl) {
      this.logger.error('backend', 'shorturl-service', 'Short URL not found', {
        shortCode,
      });
      throw new Error('Short URL not found');
    }

    if (new Date() > shortUrl.expiry) {
      this.logger.error('backend', 'shorturl-service', 'Short URL expired', { 
        shortCode, 
        expiry: shortUrl.expiry 
      });
      throw new Error('Short URL expired');
    }

    const referrer = req.headers.referer;
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    shortUrl.addClick(referrer, userAgent, ip);

    this.logger.info('backend', 'shorturl-service', 'Redirecting short URL', {
      shortCode,
      originalUrl: shortUrl.originalUrl,
    });

    return shortUrl.originalUrl;
  }

  getStats(shortCode: string): ShortUrlStatsDto {
    const shortUrl = this.urls.get(shortCode);
    if (!shortUrl) {
      this.logger.error('backend', 'shorturl-service', 'Short URL not found for stats', { shortCode });
      throw new Error('Short URL not found');
    }

    this.logger.info('backend', 'shorturl-service', 'Retrieved short URL stats', { shortCode });
    return shortUrl.getStats();
  }
}