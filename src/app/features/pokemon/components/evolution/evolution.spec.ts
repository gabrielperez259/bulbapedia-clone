import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Evolution } from './evolution';

describe('Evolution', () => {
  let component: Evolution;
  let fixture: ComponentFixture<Evolution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Evolution],
    }).compileComponents();

    fixture = TestBed.createComponent(Evolution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
