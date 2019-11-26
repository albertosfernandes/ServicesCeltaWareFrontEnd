import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTableComponent } from './download-table.component';

describe('DownloadTableComponent', () => {
  let component: DownloadTableComponent;
  let fixture: ComponentFixture<DownloadTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
