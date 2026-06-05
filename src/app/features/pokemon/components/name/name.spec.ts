import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Name } from './name';

describe('Name', () => {
  let component: Name;
  let fixture: ComponentFixture<Name>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Name],
    }).compileComponents();

    fixture = TestBed.createComponent(Name);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
