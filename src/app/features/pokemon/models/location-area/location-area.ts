import { LocalizedResource, NamedApiResource } from "../../../../shared/models/api-resource";
import { EncounterMethodRate } from "../encounters/encouter-method-rate";

export interface LocationArea {
    id: number;
    name: string;
    game_index: number;
    encouter_method_rates: EncounterMethodRate[];
    location: NamedApiResource
    names: LocalizedResource[]
    pokemon_encounters: NamedApiResource[]
}