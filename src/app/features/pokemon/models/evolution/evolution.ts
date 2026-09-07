import { NamedApiResource } from "../../../../shared/models/api-resource";



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
  species: NamedApiResource;
}

export interface EvolutionDetail {
  base_form: NamedApiResource | null;
  base_form_id: number | null;
  gender: number | null;
  held_item: NamedApiResource | null;
  item: NamedApiResource | null;
  known_move: NamedApiResource | null;
  known_move_type: NamedApiResource | null;
  location: NamedApiResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_damage_taken: number | null;
  min_happiness: number | null;
  min_level: number | null;
  min_move_count: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedApiResource | null;
  party_type: NamedApiResource | null;
  region: NamedApiResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedApiResource | null;
  trigger: NamedApiResource;
  turn_upside_down: boolean;
  evolves_to: ChainLink[];
  is_baby: boolean;
  species: NamedApiResource;
  used_move: NamedApiResource | null;
  used_move_type: NamedApiResource | null;

}

