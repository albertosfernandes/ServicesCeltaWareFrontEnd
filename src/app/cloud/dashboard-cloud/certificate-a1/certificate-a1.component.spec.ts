import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateA1Component } from './certificate-a1.component';

describe('CertificateA1Component', () => {
  let component: CertificateA1Component;
  let fixture: ComponentFixture<CertificateA1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
