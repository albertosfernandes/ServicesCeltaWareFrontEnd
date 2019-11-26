import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCloudComponent } from './dashboard-cloud.component';

describe('DashboardCloudComponent', () => {
  let component: DashboardCloudComponent;
  let fixture: ComponentFixture<DashboardCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
