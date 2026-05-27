import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelUpMoves } from './level-up-moves';

describe('LevelUpMoves', () => {
  let component: LevelUpMoves;
  let fixture: ComponentFixture<LevelUpMoves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelUpMoves]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelUpMoves);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
