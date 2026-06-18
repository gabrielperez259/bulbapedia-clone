import { Species } from '../species/spicies';

export interface EvolutionChain {
  baby_trigger_item: any | null;
  chain: ChainLink;
  id: number;
  url: string;
}

export interface ChainLink {
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
  is_baby: boolean;
  species: Species;
}

export interface EvolutionDetail {
  base_form: BaseForm | null;
  base_form_id: number | null;
  gender: number | null;
  held_item: ItemReference | null;
  item: ItemReference | null;
  known_move: ItemReference | null;
  known_move_type: ItemReference | null;
  location: ItemReference | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  min_move_count: number | null;
  needs_overworld_rain: boolean;
  party_species: ItemReference | null;
  party_type: ItemReference | null;
  region: Region | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: ItemReference | null;
  trigger: Trigger;
  turn_upside_down: boolean;
  evolves_to: ChainLink[];
  is_baby: boolean;
  species: Species;
  used_move: UsedMove | null;
  used_move_type: ItemReference | null;

}

export interface BaseForm {
  name: string;
  url: string;
}
export interface ItemReference {
  name: string;
  url: string;
}

export interface Trigger {
  name: string;
  url: string;
}

export interface Region {
  name: string;
  url: string;
}

export interface UsedMove {
  name: string;
  url: string;
}