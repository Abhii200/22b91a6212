import { Logger } from '../../../logger-middleware';

export class ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  expiry: Date;
  clicks: Array<{
    timestamp: Date;
    referrer?: string;
    userAgent?: string;
    ip?: string;
    country?: string;
  }>;

  constructor(
    private readonly logger: Logger,
    originalUrl: string, 
    shortCode: string, 
    validityMinutes: number = 30
  ) {
    this.id = Math.random().toString(36).substring(2, 10);
    this.originalUrl = originalUrl;
    this.shortCode = shortCode;
    this.createdAt = new Date();
    this.expiry = new Date(this.createdAt.getTime() + validityMinutes * 60000);
    this.clicks = [];

    this.logger.info('backend', 'shorturl-entity', 'ShortUrl created', {
      shortCode: this.shortCode,
      originalUrl: this.originalUrl,
      expiry: this.expiry,
    });
  }

  addClick(referrer?: string, userAgent?: string, ip?: string): void {
    const click = {
      timestamp: new Date(),
      referrer,
      userAgent,
      ip,
      country: this.getCountryFromIp(ip),
    };
    this.clicks.push(click);

    this.logger.info('backend', 'shorturl-entity', 'ShortUrl clicked', {
      shortCode: this.shortCode,
      clickData: click,
    });
  }

  private getCountryFromIp(ip?: string): string | undefined {
    return ip ? 'Unknown' : undefined;
  }

  getStats() {
    return {
      originalUrl: this.originalUrl,
      shortCode: this.shortCode,
      createdAt: this.createdAt.toISOString(),
      expiry: this.expiry.toISOString(),
      totalClicks: this.clicks.length,
      clicks: this.clicks.map(click => ({
        timestamp: click.timestamp.toISOString(),
        referrer: click.referrer,
        userAgent: click.userAgent,
        ip: click.ip,
        country: click.country,
      })),
    };
  }
}