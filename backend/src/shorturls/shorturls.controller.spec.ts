import { Test, TestingModule } from '@nestjs/testing';
import { ShorturlsController } from './shorturls.controller';

describe('ShorturlsController', () => {
  let controller: ShorturlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShorturlsController],
    }).compile();

    controller = module.get<ShorturlsController>(ShorturlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
