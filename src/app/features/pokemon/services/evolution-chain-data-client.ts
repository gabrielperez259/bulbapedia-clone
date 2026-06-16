import { computed, Service, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { EvolutionChain } from '../models/evolution/evolution';
import { POKEMON_FORM_MAP } from '../../../shared/constants/regional-families-map';

@Service()
export class EvolutionChainDataClient {
  public evolutionChain = computed(() => this.#evolutionChainResource.value());
  public evolutionChainlsLoading = computed(() => this.#evolutionChainResource.isLoading());
  public evolutionChainlsError = computed(() => this.#evolutionChainResource.error());

  normalizePokemonData(speciesName: string, speciesUrl: string) {
    if (POKEMON_FORM_MAP[speciesName]) {
      const exception = POKEMON_FORM_MAP[speciesName];
      return {
        name: exception.name,
        url: `https://pokeapi.co/api/v2/pokemon/${exception.id}/`,
      };
    }
    return {
      name: speciesName,
      url: speciesUrl,
    };
  }

  public baseFormResults = computed(() => {
    const chainData = this.evolutionChain();
    if (!chainData?.chain?.species) return null;
   
    return this.normalizePokemonData(chainData.chain.species.name, chainData.chain.species.url);
  });

  public firstEvolutionsList = computed(() => {
    const chainData = this.evolutionChain();

    if (!chainData?.chain?.evolves_to) return [];

    // Usamos o .map() e passamos cada evolução pela nossa função de normalização
    return chainData.chain.evolves_to.map((evo) => {
      return this.normalizePokemonData(evo.species.name, evo.species.url);
    });
  });

  public secondEvolutionsList = computed(() => {
    const chainData = this.evolutionChain();
    const evolvesTo = chainData?.chain?.evolves_to;

    if (!evolvesTo || evolvesTo.length === 0) return [];

    // Mapeia todas as primeiras evoluções e extrai as segundas evoluções delas
    const seconds = evolvesTo.flatMap((firstEvo) =>
      firstEvo.evolves_to.map((secondEvo) => ({
        name: secondEvo.species.name,
        url: secondEvo.species.url,
      })),
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
