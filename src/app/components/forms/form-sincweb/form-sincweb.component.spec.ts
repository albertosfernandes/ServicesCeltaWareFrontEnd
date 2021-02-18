import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSincwebComponent } from './form-sincweb.component';

describe('FormSincwebComponent', () => {
  let component: FormSincwebComponent;
  let fixture: ComponentFixture<FormSincwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSincwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSincwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
