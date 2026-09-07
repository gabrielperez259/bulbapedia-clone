import { NamedApiResource } from "./api-resource";


export interface FlavorTextEntry {
    flavor_text: string;
    language: NamedApiResource;
    version: NamedApiResource;
}