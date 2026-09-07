import { NamedApiResource } from "../../../../shared/models/api-resource";


export interface DamageRelations {
  no_damage_to: NamedApiResource[];
  half_damage_to: NamedApiResource[];
  double_damage_to: NamedApiResource[];
  no_damage_from: NamedApiResource[];
  half_damage_from: NamedApiResource[];
  double_damage_from: NamedApiResource[];
}

export interface GenerationGameIndex {
  game_index: number;
  generation: NamedApiResource;
}

export interface TypeName {
  name: string;
  language: NamedApiResource;
}

export interface PokemonWithType {
  slot: number;
  pokemon: NamedApiResource;
}
export interface Type {  
  id: number;
  name: string;
  damaege_relations: DamageRelations;
  past_damage_relations: DamageRelations[];
  game_indices: GenerationGameIndex[];
  generation: NamedApiResource;
  move_damage_class: NamedApiResource;
  names: TypeName[];
  pokemon: PokemonWithType[];
}
