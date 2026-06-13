import { computed, Service, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { EvolutionChain } from '../models/evolution/evolution';

@Service()
export class EvolutionChainDataClient {
  public evolutionChain = computed(() => this.#evolutionChainResource.value());
  public evolutionChainlsLoading = computed(() => this.#evolutionChainResource.isLoading());
  public evolutionChainlsError = computed(() => this.#evolutionChainResource.error());

  public baseFormResults = computed(() => {
    const chainData = this.evolutionChain();

    // Verifica se os dados existem para evitar erros de 'undefined'
    if (!chainData || !chainData.chain) {
      return null;
    }

    // Retorna um objeto contendo apenas o nome e a url da espécie base
    return {
      name: chainData.chain.species.name,
      url: chainData.chain.species.url,
    };
  });

  public firstEvolutionsList = computed(() => {
    const chainData = this.evolutionChain();

    if (!chainData?.chain?.evolves_to) return [];

    return chainData.chain.evolves_to.map((evo) => ({
      name: evo.species.name,
      url: evo.species.url,
    }));
  });


public secondEvolutionsList = computed(() => {
  const chainData = this.evolutionChain();
  const evolvesTo = chainData?.chain?.evolves_to;
  
  if (!evolvesTo || evolvesTo.length === 0) return [];

  // Mapeia todas as primeiras evoluções e extrai as segundas evoluções delas
  const seconds = evolvesTo.flatMap(firstEvo => 
    firstEvo.evolves_to.map(secondEvo => ({
      name: secondEvo.species.name,
      url: secondEvo.species.url
    }))
  );

  return seconds; // Retorna um array vazio se não houver (ex: Charmander retorna [Charizard], Applin retorna [Hydrapple])
});

  public evolutionChainUrl = signal<string>('');
  readonly #evolutionChainResource = httpResource<EvolutionChain>(() => ({
    url: `${this.evolutionChainUrl()}`,
    responseType: 'json',
    method: 'GET',
    cache: 'force-cache',
  }));
}
