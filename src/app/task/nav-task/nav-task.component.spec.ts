import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTaskComponent } from './nav-task.component';

describe('NavTaskComponent', () => {
  let component: NavTaskComponent;
  let fixture: ComponentFixture<NavTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
