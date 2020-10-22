import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseServiceComponent } from './database-service.component';

describe('DatabaseServiceComponent', () => {
  let component: DatabaseServiceComponent;
  let fixture: ComponentFixture<DatabaseServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
