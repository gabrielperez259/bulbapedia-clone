import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastValues } from './past-values';
import { inputBinding, signal } from '@angular/core';
import { MOVE_DETAILS_MOCK } from '../../../../../../testing/factories/move-factory';
import { MovesDataClient } from '../../../services/moves-data-client';

describe('PastValues', () => {
  let component: PastValues;
  let fixture: ComponentFixture<PastValues>;
  let moveDetailsDataClient: MovesDataClient;

  const moveName = signal('');

  const moveDetailsMock = MOVE_DETAILS_MOCK;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastValues],
      providers: [
        {
          provide: MovesDataClient,
          useValue: moveDetailsMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PastValues, {
      bindings: [inputBinding('pastValues', moveName)],
    });

    moveDetailsDataClient = TestBed.inject(MovesDataClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render past value names', async () => {
    moveDetailsMock.movePastValues.set([
      {
        version_group: { name: 'generation-i' },
        accuracy: 60,
        effect_entries: [{ effect: '' }],
      },
      {
        version_group: { name: 'generation-ii' },
        accuracy: 70,
        effect_entries: [{ effect: '' }],
      },
    ]);
    await fixture.whenStable();
 
    const versionElements = fixture.nativeElement.querySelectorAll(
      '.past-value-version-group span',
    );

    expect(versionElements[0].textContent).toContain('From generation-i onwards:');
    expect(versionElements[1].textContent).toContain('From generation-ii onwards:');
  });

  it('should render the past value of the move', async () => {
    moveDetailsMock.movePastValues.set([
      {
        version_group: { name: 'generation-i' },
        accuracy: 60,
        effect_entries: [{ effect: '' }],
      },
      {
        version_group: { name: 'generation-ii' },
        accuracy: 70,
        effect_entries: [{ effect: '' }],
      },
    ]);
    await fixture.whenStable();

    const accuracyElements = fixture.nativeElement.querySelectorAll(
      '.past-value-details span:nth-child(2)',
    );

    expect(accuracyElements[0].textContent).toContain('Accuracy: 60');
    expect(accuracyElements[1].textContent).toContain('Accuracy: 70');
  });
});
