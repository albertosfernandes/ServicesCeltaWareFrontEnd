import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignsatComponent } from './form-signsat.component';

describe('FormSignsatComponent', () => {
  let component: FormSignsatComponent;
  let fixture: ComponentFixture<FormSignsatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSignsatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSignsatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
