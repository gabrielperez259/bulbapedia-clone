import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ability } from './ability';

describe('Ability', () => {
  let component: Ability;
  let fixture: ComponentFixture<Ability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ability],
    }).compileComponents();

    fixture = TestBed.createComponent(Ability);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
