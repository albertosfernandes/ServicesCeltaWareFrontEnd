import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCloudVerticalComponent } from './menu-cloud-vertical.component';

describe('MenuCloudVerticalComponent', () => {
  let component: MenuCloudVerticalComponent;
  let fixture: ComponentFixture<MenuCloudVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCloudVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCloudVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
