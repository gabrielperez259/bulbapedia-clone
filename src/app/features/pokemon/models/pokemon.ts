import { Type } from './types/type';
import { Sprite } from './sprites/sprites';
import { Ability } from './abilities/ability';
import { Stats } from './stats/stats';
import { Species } from './species/spicies';
import { Move } from './moves/move';

export interface Pokemon {
  id: number;
  name: string;
  species: Species;
  sprites: Sprite;
  types: Type[];
  abilities: Ability[];
  stats: Stats[];
  moves: Move[];
}
