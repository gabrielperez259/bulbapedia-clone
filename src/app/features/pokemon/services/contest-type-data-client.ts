import { httpResource } from '@angular/common/http';
import { computed, Service, signal } from '@angular/core';
import { ContestType } from '../models/contest/contest.interface';

@Service()
export class ContestTypeDataClient {
  public search = signal('');
  #contestTypeUrl = 'https://pokeapi.co/api/v2/contest-type/';
  #contestTypeResource = httpResource<ContestType>(() => ({
    url: `${this.#contestTypeUrl}${this.search()}`,
    responseType: 'json',
    method: 'GET',
    cache: 'force-cache',
  }));
  public readonly contestType = computed(() => this.#contestTypeResource.value());
  public readonly contestTypeLoading = computed(() => this.#contestTypeResource.isLoading());
  public readonly contestTypeError = computed(() => this.#contestTypeResource.error());

  public readonly contestTypeName = computed( () => this.#contestTypeResource.value()?.name);       
  public readonly contestTypeBerryFlavor = computed(
    () => this.#contestTypeResource.value()?.berry_flavor.name,
  );
  public readonly contestTypeNames = computed(
    () =>
      this.#contestTypeResource.value()?.names?.find((name) => name.language.name === 'en')?.name,
  );
}
