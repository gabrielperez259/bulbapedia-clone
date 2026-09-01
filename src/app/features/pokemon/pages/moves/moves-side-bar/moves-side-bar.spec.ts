import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesSideBar } from './moves-side-bar';

describe('MovesSideBar', () => {
  let component: MovesSideBar;
  let fixture: ComponentFixture<MovesSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesSideBar],
    }).compileComponents();

    fixture = TestBed.createComponent(MovesSideBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
