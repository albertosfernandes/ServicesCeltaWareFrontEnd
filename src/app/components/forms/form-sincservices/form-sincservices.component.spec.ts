import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSincservicesComponent } from './form-sincservices.component';

describe('FormSincservicesComponent', () => {
  let component: FormSincservicesComponent;
  let fixture: ComponentFixture<FormSincservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSincservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSincservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
