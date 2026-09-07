import { NamedApiResource } from "../../../../shared/models/api-resource"

export interface Generation {
  id: number;
  name: string;
  abilities: NamedApiResource[];
  main_region: NamedApiResource;
  moves: NamedApiResource[];
  pokemon_species: NamedApiResource[];
  types: NamedApiResource[];
  version_groups: NamedApiResource[];
}