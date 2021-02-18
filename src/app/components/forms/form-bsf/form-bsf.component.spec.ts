import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBsfComponent } from './form-bsf.component';

describe('FormBsfComponent', () => {
  let component: FormBsfComponent;
  let fixture: ComponentFixture<FormBsfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBsfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBsfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
