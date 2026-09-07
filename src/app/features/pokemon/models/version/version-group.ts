import { NamedApiResource } from "../../../../shared/models/api-resource";

export interface VersionGroup{
    id: number;
    name: string;
    order: number;
    generation: NamedApiResource;
    move_learn_method: NamedApiResource[];
    pokedexes: NamedApiResource[];
    versions: NamedApiResource[];
}