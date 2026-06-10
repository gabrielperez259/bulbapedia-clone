import { computed, Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { EvolutionChain } from '../models/evolution/evolution';

@Injectable({
  providedIn: 'root',
})
export class EvolutionChainDataClient {
  public pokemonDetails = computed(() => this.#evolutionChainResource.value());
  public pokemonDetailsLoading = computed(() => this.#evolutionChainResource.isLoading());
  public pokemonDetailsError = computed(() => this.#evolutionChainResource.error());

  public baseFormSpecieName = computed(
    () => this.#evolutionChainResource.value()?.chain.species.name,
  );

  public baseFormVariantName = computed(() => {
    // Acessa a lista de detalhes de evolução da primeira evolução disponível
    const details = this.#evolutionChainResource.value()?.chain.evolves_to?.[0]?.evolution_details;

    // Procura pelo primeiro detalhe que tenha o objeto 'base_form' preenchido
    const variantDetail = details?.find((detail) => detail.base_form !== null);

    // Se encontrar, retorna o nome da variação regional, caso contrário retorna null
    return variantDetail ? variantDetail.base_form.name : null;
  });


  public evolutionChainUrl = signal<string>('');
  readonly #evolutionChainResource = httpResource<EvolutionChain>(() => ({
    url: `${this.evolutionChainUrl()}`,
    responseType: 'json',
    method: 'GET',
  }));
}
