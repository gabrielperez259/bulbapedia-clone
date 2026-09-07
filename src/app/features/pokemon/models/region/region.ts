import { LocalizedResource, NamedApiResource } from "../../../../shared/models/api-resource";

export interface Region {
    id: number;
    name: string;
    names: LocalizedResource[];
    main_generation: NamedApiResource;
    pokedexes: NamedApiResource[];
    version_groups: NamedApiResource[];
}