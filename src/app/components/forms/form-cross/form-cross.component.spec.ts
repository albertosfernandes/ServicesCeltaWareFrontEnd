import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrossComponent } from './form-cross.component';

describe('FormCrossComponent', () => {
  let component: FormCrossComponent;
  let fixture: ComponentFixture<FormCrossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
