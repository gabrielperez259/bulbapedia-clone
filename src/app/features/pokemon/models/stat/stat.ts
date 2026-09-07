import { ApiResourceReference, LocalizedResource, NamedApiResource } from "../../../../shared/models/api-resource";

export interface StatAffectingDetails{
  change: number;
  move: NamedApiResource
}


export interface StatAffecting {
  increase: StatAffectingDetails[];
  decrease: StatAffectingDetails[];
}
export interface Stat {
  id: number;
  name: string;
  game_index: number;
  is_battle_only: boolean;
  affecting_moves: StatAffecting[];
  affecting_natures: StatAffecting[];  
  affecting_items: NamedApiResource[];
  characteristic: ApiResourceReference;
  move_damage_class: NamedApiResource;
  names: LocalizedResource[];
  
}
