import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionChainDetails } from './evolution-chain-details';

describe('EvolutionChainDetails', () => {
  let component: EvolutionChainDetails;
  let fixture: ComponentFixture<EvolutionChainDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionChainDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(EvolutionChainDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
