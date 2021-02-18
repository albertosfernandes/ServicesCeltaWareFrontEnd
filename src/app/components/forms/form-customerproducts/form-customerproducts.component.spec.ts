import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCustomerproductsComponent } from './form-customerproducts.component';

describe('FormCustomerproductsComponent', () => {
  let component: FormCustomerproductsComponent;
  let fixture: ComponentFixture<FormCustomerproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCustomerproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCustomerproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
