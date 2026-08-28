import { EvolutionChain } from '../evolution/evolution';
import { Results } from '../results';
import { Species } from './species';
import { Varieties } from './varieties';

export interface Specie {
  name: string;
  generation: Species;
  evolves_from_species: Results;
  evolution_chain: EvolutionChain;
  varieties: Varieties[];
}
