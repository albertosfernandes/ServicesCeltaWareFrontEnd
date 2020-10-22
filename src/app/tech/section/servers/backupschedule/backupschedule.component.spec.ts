import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupscheduleComponent } from './backupschedule.component';

describe('BackupscheduleComponent', () => {
  let component: BackupscheduleComponent;
  let fixture: ComponentFixture<BackupscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
