import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveFlavorText } from './move-flavor-text';

describe('MoveFlavorText', () => {
  let component: MoveFlavorText;
  let fixture: ComponentFixture<MoveFlavorText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveFlavorText],
    }).compileComponents();

    fixture = TestBed.createComponent(MoveFlavorText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
