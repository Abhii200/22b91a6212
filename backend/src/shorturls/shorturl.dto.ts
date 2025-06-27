import { IsString, IsUrl, IsOptional, IsInt } from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsInt()
  validity?: number;

  @IsOptional()
  @IsString()
  shortcode?: string;
}

export class ShortUrlResponseDto {
  shortLink: string;
  expiry: string;
}

export class ShortUrlStatsDto {
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  expiry: string;
  totalClicks: number;
  clicks: Array<{
    timestamp: string;
    referrer?: string;
    userAgent?: string;
    ip?: string;
    country?: string;
  }>;
}