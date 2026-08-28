import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectByGenBar } from './select-by-gen-bar';
import { GenValues } from '../../../../shared/utils/gen-values';

describe('SelectByGenBar', () => {
  let component: SelectByGenBar;
  let fixture: ComponentFixture<SelectByGenBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectByGenBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectByGenBar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedGeneration', GenValues.GenOne);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reflects the selected generation', () => {
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;

    expect(select.value).toBe(GenValues.GenOne);
  });
});
