import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { LocationAreaEncounter } from '../models/encounters/location-area-encounter';

@Injectable({ providedIn: 'root' })
export class LocationAreaEncountersDataClient {
  public url = signal<string>('');

  public encountersLoading = computed(() => this.#encountersResource.isLoading());
  public encountersError = computed(() => this.#encountersResource.error());
  public encounters = computed(() => this.#encountersResource.value() ?? []);

  readonly #encountersResource = httpResource<LocationAreaEncounter[]>(() => ({
    url: this.url(),
    responseType: 'json',
    method: 'GET',
    cache: 'force-cache',
    initialValue: [],
  }));
}
