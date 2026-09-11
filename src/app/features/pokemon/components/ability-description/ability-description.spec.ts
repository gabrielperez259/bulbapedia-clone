import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, signal } from '@angular/core';
import { AbilityDescription } from './ability-description';
import { AbilityDataClient } from '../../services/ability-data-client';

describe('AbilityDescription', () => {
  let fixture: ComponentFixture<AbilityDescription>;
  let component: AbilityDescription;

  const abilityDataClientMock = {
    abilityName: signal(''),
    abilityDetailsLoading: signal(false),
    abilityDetailsError: signal(false),
    abilityDescription: signal(''),
  };

  beforeEach(async () => {
    abilityDataClientMock.abilityDescription.set('')
    abilityDataClientMock.abilityDetailsLoading.set(false)
    abilityDataClientMock.abilityDetailsError.set(false)
    abilityDataClientMock.abilityName.set('overgrow')
   
    await TestBed.configureTestingModule({
      imports: [AbilityDescription],
      providers: [
        {
          provide: AbilityDataClient,
          useValue: abilityDataClientMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AbilityDescription, {
      bindings: [
        inputBinding('abilityName', abilityDataClientMock.abilityName),
      ],
    });

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the ability name in the data client', async () => {
    abilityDataClientMock.abilityName.set('overgrow');
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(abilityDataClientMock.abilityName()).toBe('overgrow');
  });
 

  it('should display the ability description', async () => {
    abilityDataClientMock.abilityName.set('overgrow');
    fixture.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const element = fixture.nativeElement.querySelector(
      '.ability-description-container p',
    );

    expect(element).not.toBeNull();
    expect(element.textContent).toContain('inflict 1.5× as much regular damage');
  });
});

