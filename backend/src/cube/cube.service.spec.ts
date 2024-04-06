import { Test, TestingModule } from '@nestjs/testing';
import { CubeService } from './cube.service';

describe('CubeService', () => {
  let service: CubeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CubeService],
    }).compile();

    service = module.get<CubeService>(CubeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
