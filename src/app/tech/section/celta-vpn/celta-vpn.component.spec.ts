import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeltaVpnComponent } from './celta-vpn.component';

describe('CeltaVpnComponent', () => {
  let component: CeltaVpnComponent;
  let fixture: ComponentFixture<CeltaVpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeltaVpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeltaVpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
