import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatabaseuserComponent } from './form-databaseuser.component';

describe('FormDatabaseuserComponent', () => {
  let component: FormDatabaseuserComponent;
  let fixture: ComponentFixture<FormDatabaseuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDatabaseuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatabaseuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
