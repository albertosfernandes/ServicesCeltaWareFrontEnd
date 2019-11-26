import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCloudComponent } from './menu-cloud.component';

describe('MenuCloudComponent', () => {
  let component: MenuCloudComponent;
  let fixture: ComponentFixture<MenuCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
