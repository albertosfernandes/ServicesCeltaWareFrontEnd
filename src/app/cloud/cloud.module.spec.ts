import { CloudModule } from './cloud.module';

describe('CloudModule', () => {
  let cloudModule: CloudModule;

  beforeEach(() => {
    cloudModule = new CloudModule();
  });

  it('should create an instance', () => {
    expect(cloudModule).toBeTruthy();
  });
});
