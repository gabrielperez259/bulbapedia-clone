import { LocalizedResource } from "../../../../shared/models/api-resource";

export interface EncounterMethodRate {
    id: number;
    name: string;
    order: number;
    names: LocalizedResource[];

}