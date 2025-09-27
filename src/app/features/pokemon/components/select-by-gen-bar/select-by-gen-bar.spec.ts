import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectByGenBar } from './select-by-gen-bar';

describe('SelectByGenBar', () => {
  let component: SelectByGenBar;
  let fixture: ComponentFixture<SelectByGenBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectByGenBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectByGenBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
