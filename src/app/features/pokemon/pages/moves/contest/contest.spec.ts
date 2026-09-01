import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contest } from './contest';

describe('Contest', () => {
  let component: Contest;
  let fixture: ComponentFixture<Contest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contest],
    }).compileComponents();

    fixture = TestBed.createComponent(Contest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
