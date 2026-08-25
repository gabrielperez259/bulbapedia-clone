import { Type } from './types/type';
import { Sprite } from './sprites/sprites';
import { PokemonAbilityList } from './abilities/ability';
import { Stats } from './stats/stats';
import { Species } from './species/species';
import { Move } from './moves/move';

export interface Pokemon {
  id: number;
  name: string;
  is_default: boolean;
  location_area_encounters: string;
  species: Species;
  sprites: Sprite;
  types: Type[];
  abilities: PokemonAbilityList[];
  stats: Stats[];
  moves: Move[];
}
