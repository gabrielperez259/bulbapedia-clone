import { Sprite } from './sprites/sprites';
import { MoveVersionGroupDetails } from './moves/move';
import { NamedApiResource } from '../../../shared/models/api-resource';

 export interface PokemonAbility {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonPastAbility {
  generation: NamedApiResource;
  ability: PokemonAbility;
}

export interface PokemonGameIndex {
  game_index: number;
  version: NamedApiResource;

}

export interface PokemonHeldItemVersionDetails {
  rarity: number;
  version: NamedApiResource;

  
}

export interface PokemonHeldItem {
  item: NamedApiResource;
  version_details: PokemonHeldItemVersionDetails[];
}

export type PokemonCries = {
  latest: string;
  legacy: string;
}
export interface PokemonMove {
  move: NamedApiResource;
  version_group_details: MoveVersionGroupDetails[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}
export interface PokemonPastStat {
  generation: NamedApiResource;
  stats: PokemonStat[];
}
export interface PokemonType {
  slot: number;
  type: NamedApiResource;  
}

export interface PokemonPastType {
  generation: NamedApiResource;
  types: PokemonType[];
}
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  past_abilities: PokemonPastAbility[];
  forms: NamedApiResource[];
  game_indices: PokemonGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: NamedApiResource;
  sprites: Sprite;  
  cries: PokemonCries;
  stats: PokemonStat[];
  past_stats: PokemonPastStat[];  
  types: PokemonType[];
  past_types: PokemonPastType[];
}
