import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchServiceComponent } from './synch-service.component';

describe('SynchServiceComponent', () => {
  let component: SynchServiceComponent;
  let fixture: ComponentFixture<SynchServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynchServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
