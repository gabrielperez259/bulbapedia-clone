import { NamedApiResource } from "../../../../shared/models/api-resource";

export interface Machine {
    id: number;
    item: NamedApiResource;  
    version_group: NamedApiResource;
    move: NamedApiResource;
}