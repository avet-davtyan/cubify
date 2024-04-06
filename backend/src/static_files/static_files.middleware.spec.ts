import { StaticFilesMiddleware } from './static_files.middleware';

describe('StaticFilesMiddleware', () => {
  it('should be defined', () => {
    expect(new StaticFilesMiddleware()).toBeDefined();
  });
});
