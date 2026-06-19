import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityDetails } from './ability-details';

describe('AbilityDetails', () => {
  let component: AbilityDetails;
  let fixture: ComponentFixture<AbilityDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilityDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AbilityDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
