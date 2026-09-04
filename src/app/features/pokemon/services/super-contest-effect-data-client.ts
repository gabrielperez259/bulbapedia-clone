import { computed, Service, signal } from '@angular/core';
import { SuperContestEffect } from '../models/contest/contest.interface';
import { httpResource } from '@angular/common/http';

@Service()
export class SuperContestEffectDataClient {
  public url = signal('');
  readonly #superContestEffectResource = httpResource<SuperContestEffect>(() => {
    const url = this.url();

    if (!url) {
      return undefined;
    }

    return {
      url,
      responseType: 'json',
      method: 'GET',
      cache: 'force-cache',
    };
  });
  public readonly superContestEffect = computed(() => this.#superContestEffectResource.value());
  public readonly superContestEffectLoading = computed(() =>
    this.#superContestEffectResource.isLoading(),
  );
  public readonly superContestEffectError = computed(() =>
    this.#superContestEffectResource.error(),
  );
  public readonly superContestEffectAppeal = computed(
    () => this.#superContestEffectResource.value()?.appeal
  )
  public readonly superContestEffectFlavorText = computed(
    () =>
      this.#superContestEffectResource
        .value()
        ?.flavor_text_entries?.find((entry) => entry.language.name === 'en')?.flavor_text,
  );
  public readonly superContestEffectMovesNames = computed(
    () => this.#superContestEffectResource.value()?.moves.map((move) => move.name) ?? [],
  );
}
