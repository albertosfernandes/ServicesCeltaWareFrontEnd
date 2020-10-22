import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatabaseComponent } from './form-database.component';

describe('FormDatabaseComponent', () => {
  let component: FormDatabaseComponent;
  let fixture: ComponentFixture<FormDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
