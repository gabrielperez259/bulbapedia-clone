import { environment } from '../../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { MoveDetails } from '../models/moves/move-details';


export interface TypeResponse {
  id: number;
  name: string;
  moves: { name: string; url: string }[];
}

@Injectable({ providedIn: 'root' })
export class MovesDataClient {
  #url = environment.movesUrl;
  #typeUrl = environment.movesUrl.replace(/\/move\/?$/, '/type/');

  public selectedType = signal<string>('normal');
  public search = signal('');
  
  #detailsCache = new Map<string, MoveDetails>();
  public cachedDetails = signal<Map<string, MoveDetails>>(new Map());

  public setCachedDetail(name: string, details: MoveDetails) {
    if (name && details && !this.#detailsCache.has(name)) {
      this.#detailsCache.set(name, details);
      this.cachedDetails.set(new Map(this.#detailsCache));
    }
  }

  public details = computed(() => this.moveDetails.value());
  public moveDetailsLoading = computed(() => this.moveDetails.isLoading());
  public moveDetailsError = computed(() => this.moveDetails.error());
  public moveAccuracy = computed(() => this.moveDetails.value()?.accuracy);
  public moveName = computed(() => this.moveDetails.value()?.name);
  public movePower = computed(() => this.moveDetails.value()?.power);
  public movePP = computed(() => this.moveDetails.value()?.pp);
  public moveType = computed(() => this.moveDetails.value()?.type);
  public moveDamageClass = computed(() => this.moveDetails.value()?.damage_class);
  public moveGenerationIntroduced = computed(() => this.moveDetails.value()?.generation);
  public movePastValues = computed(() => this.moveDetails.value()?.past_values);
  public moveTarget = computed(() => this.moveDetails.value()?.target.name);
  public moveContestTypeName = computed(() => this.moveDetails.value()?.contest_type?.name);
  public moveContestCombos = computed(() => this.moveDetails.value()?.contest_combos);
  public moveContestEffect = computed(() => this.moveDetails.value()?.contest_effect.url);
  public moveSuperContestEffect = computed(() => this.moveDetails.value()?.super_contest_effect.url);
  
  public moveEffectEntry = computed(() =>
    this.moveDetails.value()?.effect_entries?.find((entry) => entry.language.name === 'en'),
  );

  readonly movesList = computed(() => this.#movesByTypeResource.value()?.moves ?? []);
  readonly movesListLoading = computed(() => this.#movesByTypeResource.isLoading());
  readonly movesListError = computed(() => this.#movesByTypeResource.error());

  readonly #movesByTypeResource = httpResource<TypeResponse>(() => ({
    url: `${this.#typeUrl}${this.selectedType().toLowerCase()}`,
    responseType: 'json',
    method: 'GET',
    transferCache: true,
    cache: 'force-cache',
  }));

  readonly moveDetails = httpResource<MoveDetails>(() => ({
    url: `${this.#url}${this.search()}`,
    responseType: 'json',
    method: 'GET',
    transferCache: true,
    cache: 'force-cache',
  }));
}


