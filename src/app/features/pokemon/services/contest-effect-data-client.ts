import { computed, Service, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { ContestEffect } from '../models/contest/contest.interface';

// nova api angular que substitui @Injectable
@Service()
export class ContestEffectDataClient {
  public url = signal('');

  readonly #contestEffectResource = httpResource<ContestEffect>(() => {
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

  public readonly contestEffect = computed(() => this.#contestEffectResource.value());
  public readonly contestEffectLoading = computed(() => this.#contestEffectResource.isLoading());
  public readonly contestEffectError = computed(() => this.#contestEffectResource.error());
  public readonly contestEffectAppeal = computed(() => this.#contestEffectResource.value()?.appeal);
  public readonly contestEffectJam = computed(() => this.#contestEffectResource.value()?.jam);
  public readonly contestEffectFlavorText = computed(
    () =>
      this.#contestEffectResource
        .value()
        ?.flavor_text_entries?.find((entry) => entry.language.name === 'en')?.flavor_text,
  );
  public readonly contestEffectName = computed(
    () =>
      this.#contestEffectResource
        .value()
        ?.effect_entries?.find((entry) => entry.language.name === 'en')?.effect,
  );
}
