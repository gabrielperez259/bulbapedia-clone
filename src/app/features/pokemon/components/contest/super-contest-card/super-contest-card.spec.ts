import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperContestCard } from './super-contest-card';

describe('SuperContestCard', () => {
  let component: SuperContestCard;
  let fixture: ComponentFixture<SuperContestCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperContestCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperContestCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
