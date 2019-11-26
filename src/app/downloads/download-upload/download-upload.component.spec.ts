import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadUploadComponent } from './download-upload.component';

describe('DownloadUploadComponent', () => {
  let component: DownloadUploadComponent;
  let fixture: ComponentFixture<DownloadUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
