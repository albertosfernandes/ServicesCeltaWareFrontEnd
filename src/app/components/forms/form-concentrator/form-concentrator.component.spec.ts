import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConcentratorComponent } from './form-concentrator.component';

describe('FormConcentratorComponent', () => {
  let component: FormConcentratorComponent;
  let fixture: ComponentFixture<FormConcentratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConcentratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConcentratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
