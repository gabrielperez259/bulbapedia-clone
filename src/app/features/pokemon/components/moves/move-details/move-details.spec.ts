import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveDetails } from './move-details';

describe('MoveDetails', () => {
  let component: MoveDetails;
  let fixture: ComponentFixture<MoveDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
