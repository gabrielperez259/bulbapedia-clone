
import { ApiResourceReference, LocalizedResource, NamedApiResource } from '../../../../shared/models/api-resource';
import { FlavorTextEntry } from '../../../../shared/models/flavor-text-entry';

export interface SpeciePokedexNumber {
  entry_number: number
  pokedex: NamedApiResource
}

export interface PalParkEncounter {
  base_score: number
  rate: number
  area: NamedApiResource
}
export interface FormDescription {
  description: string;
  language: NamedApiResource;
}
export interface Genera {
  genus: string
  language: NamedApiResource
}

export interface Variety {
  is_default: boolean;
  pokemon: NamedApiResource;
}


export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;  
  forms_switchable: boolean;
  growth_rate: NamedApiResource;
  pokedex_numbers: SpeciePokedexNumber[];
  egg_groups: NamedApiResource[];
  color: NamedApiResource;
  shape: NamedApiResource; 
  evolves_from_species: NamedApiResource | null;
  evolution_chain: ApiResourceReference;
  habitat: NamedApiResource | null;
  names: LocalizedResource[];
  pal_park_encounters: PalParkEncounter[];
  form_descriptions: FormDescription[];
  flavor_text_entries: FlavorTextEntry[];
  generation: NamedApiResource;
  genera: Genera[];
  varieties: Variety[];
}
