import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestType } from './contest-type';

describe('ContestType', () => {
  let component: ContestType;
  let fixture: ComponentFixture<ContestType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestType],
    }).compileComponents();

    fixture = TestBed.createComponent(ContestType);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('contestTypeName', 'cool');
    fixture.componentRef.setInput('contestTypeBerryFlavor', 'spicy');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
