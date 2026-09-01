import { environment } from '../../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { MoveDetails } from '../models/moves/move-details';

@Injectable({ providedIn: 'root' })
export class MovesDataClient {
  #url = environment.movesUrl;

  public search = signal('');
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
  
  public moveEffectEntry = computed(() =>
    this.moveDetails.value()?.effect_entries?.find((entry) => entry.language.name === 'en'),
  );

  
  readonly moveDetails = httpResource<MoveDetails>(() => ({
    url: `${this.#url}${this.search()}`,
    responseType: 'json',
    method: 'GET',
    transferCache: true,
    cache: 'force-cache',
  }));
}
