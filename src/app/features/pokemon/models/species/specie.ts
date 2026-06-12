import { EvolutionChain } from '../evolution/evolution';
import { Results } from '../results';
import { Varieties } from './varieties';

export interface Specie {
  name: string;
  evolves_from_species: Results;
  evolution_chain: EvolutionChain;
  varieties: Varieties[];
}
