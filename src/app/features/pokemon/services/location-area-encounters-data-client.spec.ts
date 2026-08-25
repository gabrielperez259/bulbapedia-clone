import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LocationAreaEncountersDataClient } from './location-area-encounters-data-client';

describe('LocationAreaEncountersDataClient', () => {
  let service: LocationAreaEncountersDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocationAreaEncountersDataClient,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(LocationAreaEncountersDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
