import { NamedApiResource } from "../../../../shared/models/api-resource";

export interface CharacteristicDescription {
    description: string;
    language: NamedApiResource;
}
export interface Characteristic {
    id: number;
    gene_modulo: number;
    possible_values: number[];
    highest_stat: NamedApiResource;
    descriptions: CharacteristicDescription[];
}