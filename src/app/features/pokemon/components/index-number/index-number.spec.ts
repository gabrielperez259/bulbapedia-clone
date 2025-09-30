import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNumber } from './index-number';

describe('IndexNumber', () => {
  let component: IndexNumber;
  let fixture: ComponentFixture<IndexNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
