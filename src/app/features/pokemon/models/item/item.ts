import { LocalizedResource, NamedApiResource } from '../../../../shared/models/api-resource';

export interface EffectEntry {
  effect: string;
  short_effect: string;
  language: NamedApiResource;
}

export interface FlavorTextEntry {
  text: string;
  version_group: NamedApiResource;
  language: NamedApiResource;
}

export interface GameIndex {
  game_index: number;
  generation: NamedApiResource;
}

export interface ItemPrice {
  currency: NamedApiResource;

  amount: number;
}

export interface HeldByPokemon {
  pokemon: NamedApiResource;
  version_details: ItemVersionDetail[];
}

export interface ItemVersionDetail {
  rarity: number;
  version: NamedApiResource;
}

export interface ItemSprites {
  default: string;
}

export interface Machine {
  machine: NamedApiResource;
  version_group: NamedApiResource;
}
export interface Item {
  id: number;
  name: string;
  fling_power: number | null;
  fling_effect: NamedApiResource | null;
  attributes: NamedApiResource[];
  category: NamedApiResource;
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  game_indices: GameIndex[];
  prices: ItemPrice[];
  names: LocalizedResource[];
  held_by_pokemon: HeldByPokemon[];
  sprites: ItemSprites;
  baby_trigger_for: NamedApiResource | null;
  machines: Machine[];
}
