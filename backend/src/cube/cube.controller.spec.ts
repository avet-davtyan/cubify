import { Test, TestingModule } from '@nestjs/testing';
import { CubeController } from './cube.controller';

describe('CubeController', () => {
  let controller: CubeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CubeController],
    }).compile();

    controller = module.get<CubeController>(CubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
