import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { AbilityDataClient } from './ability-data-client';
import { environment } from '../../../../environments/environment';
import { ApplicationRef } from '@angular/core';

describe('AbilityDataClient', () => {
  let service: AbilityDataClient;
  let httpTesting: HttpTestingController;

  const abilityResponse = {
    pokemon: [
      {
        is_hidden: false,
        slot: 1,
        pokemon: {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      },
      {
        is_hidden: false,
        slot: 2,
        pokemon: {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
      },
    ],
    flavor_text_entries: [
      {
        flavor_text: 'First English text.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/',
        },
        version_group: {
          name: 'red-blue',
          url: 'https://pokeapi.co/api/v2/version-group/1/',
        },
      },
      {
        flavor_text: 'Japanese text.',
        language: {
          name: 'ja',
          url: 'https://pokeapi.co/api/v2/language/11/',
        },
        version_group: {
          name: 'red-blue',
          url: 'https://pokeapi.co/api/v2/version-group/1/',
        },
      },
      {
        flavor_text: 'Second English text from same version.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/',
        },
        version_group: {
          name: 'red-blue',
          url: 'https://pokeapi.co/api/v2/version-group/1/',
        },
      },
      {
        flavor_text: 'Gold Silver text.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/',
        },
        version_group: {
          name: 'gold-silver',
          url: 'https://pokeapi.co/api/v2/version-group/3/',
        },
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AbilityDataClient,
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AbilityDataClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set the ability name', async () => {
    service.abilityName.set('overgrow'); 

    expect(service.abilityName()).toBe('overgrow');
  });

  it('should make a GET request with the ability name', async () => {
    service.abilityName.set('overgrow');
    TestBed.tick();

    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    expect(request.request.method).toBe('GET');

    request.flush(abilityResponse);

    await TestBed.inject(ApplicationRef).whenStable();
  });

  it('should set loading while the ability request is pending', () => {
    service.abilityName.set('overgrow');
    TestBed.tick();

    expect(service.abilityDetailsLoading()).toBe(true);

    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    request.flush(abilityResponse);
  });

  it('should stop loading after the ability request finishes', async () => {
    service.abilityName.set('overgrow');
    TestBed.tick();

    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    expect(service.abilityDetailsLoading()).toBe(true);

    request.flush(abilityResponse);

    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.abilityDetailsLoading()).toBe(false);
  });

  it('should expose the request error', async () => {
    service.abilityName.set('overgrow');
    TestBed.tick();

    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    request.flush('Not found', {
      status: 404,
      statusText: 'Not Found',
    });

    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.abilityDetailsError()).toBeTruthy();
  });

  it('should return the pokemon from the API response', async () => {
    service.abilityName.set('overgrow');
    TestBed.tick();

    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    request.flush(abilityResponse);

    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.pokemonsWithAbility()).toEqual([
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
    ]);
  });

  it('should return an empty array when the API data is unavailable', () => {
    expect(service.pokemonsWithAbility()).toEqual([]);
  });

  it('should return an empty array for flavor text when the API data is unavailable', () => {
    expect(service.abilityFlavorText()).toEqual([]);
  });

  it('should return only english flavor text entries', async () => {
    service.abilityName.set('overgrow');
    TestBed.tick();

    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    request.flush(abilityResponse);

    await TestBed.inject(ApplicationRef).whenStable();

    const flavorTexts = service.abilityFlavorText();

    expect(
      flavorTexts.every((entry) => entry.language.name === 'en')
    ).toBe(true);
  });

  it('should return only one flavor text entry per version group', async () => {
    service.abilityName.set('overgrow');
    TestBed.tick();

    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    request.flush(abilityResponse);

    await TestBed.inject(ApplicationRef).whenStable();

    const flavorTexts = service.abilityFlavorText();

    expect(flavorTexts).toHaveLength(2);

    expect(
      flavorTexts.map((entry) => entry.version_group.name)
    ).toEqual([
      'red-blue',
      'gold-silver',
    ]);
  });

  it('should keep the first flavor text entry for each version group', async () => {
    service.abilityName.set('overgrow');
    TestBed.tick();

    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    request.flush(abilityResponse);

    await TestBed.inject(ApplicationRef).whenStable();

    const redBlueEntry = service
      .abilityFlavorText()
      .find((entry) => entry.version_group.name === 'red-blue');

    expect(redBlueEntry?.flavor_text).toBe(
      'First English text.'
    );
  });

  it('should return flavor text entries from different version groups', async () => {
    service.abilityName.set('overgrow');
    TestBed.tick();
    
    const request = httpTesting.expectOne(
      `${environment.AbilitiesUrl}overgrow`
    );

    request.flush(abilityResponse);

    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.abilityFlavorText()).toEqual([
      abilityResponse.flavor_text_entries[0],
      abilityResponse.flavor_text_entries[3],
    ]);
  });
});