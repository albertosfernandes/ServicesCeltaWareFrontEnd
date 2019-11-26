import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadNewcategoryComponent } from './download-newcategory.component';

describe('DownloadNewcategoryComponent', () => {
  let component: DownloadNewcategoryComponent;
  let fixture: ComponentFixture<DownloadNewcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadNewcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadNewcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
