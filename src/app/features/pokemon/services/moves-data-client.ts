import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { computed, signal } from '@angular/core';
import { MoveDetails } from '../models/moves/move-details';

@Injectable({
  providedIn: 'root',
})
export class MovesDataClient {
  url = environment.movesUrl;
  serch = signal('');
  #http = inject(HttpClient);

  public search = signal('');
  public moveDetailsLoading = computed(() => this.moveDetails.isLoading());
  public moveDetailsError = computed(() => this.moveDetails.error());
  public moveAccuracy = computed(() => this.moveDetails.value()?.accuracy);
  public moveName = computed(() => this.moveDetails.value()?.name);
  public movePower = computed(() => this.moveDetails.value()?.power);
  public movePP = computed(() => this.moveDetails.value()?.pp);
  public moveType = computed(() => this.moveDetails.value()?.type);
  public moveDamageClass = computed(() => this.moveDetails.value()?.damage_class);

  readonly moveDetails = httpResource<MoveDetails>(() => ({
    url: `${this.url}${this.search()}`,
    responseType: 'json',
    method: 'GET',
    transferCache: true,
    cache: 'force-cache',
  }));
}
