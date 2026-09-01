import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Machines } from './machines';

describe('Machines', () => {
  let component: Machines;
  let fixture: ComponentFixture<Machines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Machines],
    }).compileComponents();

    fixture = TestBed.createComponent(Machines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
