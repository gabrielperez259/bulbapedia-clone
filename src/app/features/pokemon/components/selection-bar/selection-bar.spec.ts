import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionBar } from './selection-bar';

describe('SelectionBar', () => {
  let component: SelectionBar;
  let fixture: ComponentFixture<SelectionBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
