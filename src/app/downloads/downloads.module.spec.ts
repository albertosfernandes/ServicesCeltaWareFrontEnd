import { DownloadsModule } from './downloads.module';

describe('DownloadsModule', () => {
  let downloadsModule: DownloadsModule;

  beforeEach(() => {
    downloadsModule = new DownloadsModule();
  });

  it('should create an instance', () => {
    expect(downloadsModule).toBeTruthy();
  });
});
