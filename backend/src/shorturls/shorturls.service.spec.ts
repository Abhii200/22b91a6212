import { Test, TestingModule } from '@nestjs/testing';
import { ShorturlsService } from './shorturls.service';

describe('ShorturlsService', () => {
  let service: ShorturlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShorturlsService],
    }).compile();

    service = module.get<ShorturlsService>(ShorturlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
