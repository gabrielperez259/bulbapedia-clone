import { LocalizedResource, NamedApiResource } from "../../../../shared/models/api-resource";

export interface PokedexEntry{
    entry_number: number;
    pokemon_species: NamedApiResource;
}
export interface Pokedex{
    id: number;
    name: string;
    is_main_series: boolean;
    names: LocalizedResource[];
    pokemon_entries: PokedexEntry[];
    region: NamedApiResource | null;
    version_groups: NamedApiResource[];
}