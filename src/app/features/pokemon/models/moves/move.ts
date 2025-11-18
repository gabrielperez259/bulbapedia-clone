import { VersionGroupDetails } from "./version-group-details"

export interface Move{
    move : {
        name : string,
        url : string
    } 
    version_group_details : VersionGroupDetails[]

}