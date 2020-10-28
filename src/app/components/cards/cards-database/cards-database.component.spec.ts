import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDatabaseComponent } from './cards-database.component';

describe('CardsDatabaseComponent', () => {
  let component: CardsDatabaseComponent;
  let fixture: ComponentFixture<CardsDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
