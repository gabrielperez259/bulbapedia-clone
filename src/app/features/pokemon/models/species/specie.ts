import { EvolutionChain } from '../evolution/evolution';
import { Varieties } from './varieties';

export interface Specie {
  name: string;
  evolution_chain: EvolutionChain;
  varieties: Varieties[];
}
