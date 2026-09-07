import { LocalizedResource, NamedApiResource } from "../../../../shared/models/api-resource";

export interface Version {
    id: number;
    name: string;
    names: LocalizedResource[];
    version_group: NamedApiResource;
}