import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerProductsComponent } from './add-customer-products.component';

describe('AddCustomerProductsComponent', () => {
  let component: AddCustomerProductsComponent;
  let fixture: ComponentFixture<AddCustomerProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
