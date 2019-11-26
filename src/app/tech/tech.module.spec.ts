import { TechModule } from './tech.module';

describe('TechModule', () => {
  let techModule: TechModule;

  beforeEach(() => {
    techModule = new TechModule();
  });

  it('should create an instance', () => {
    expect(techModule).toBeTruthy();
  });
});
