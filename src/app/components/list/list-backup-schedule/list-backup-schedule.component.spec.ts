import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBackupScheduleComponent } from './list-backup-schedule.component';

describe('ListBackupScheduleComponent', () => {
  let component: ListBackupScheduleComponent;
  let fixture: ComponentFixture<ListBackupScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBackupScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBackupScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
