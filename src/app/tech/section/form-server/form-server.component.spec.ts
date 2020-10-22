import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormServerComponent } from './form-server.component';

describe('FormServerComponent', () => {
  let component: FormServerComponent;
  let fixture: ComponentFixture<FormServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
