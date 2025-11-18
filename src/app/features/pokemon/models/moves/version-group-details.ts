import { VersionGroup } from "./version-group"
import { MoveLearnMethod } from "./move-learn-method"

export interface VersionGroupDetails {
    level_learned_at : number
    move_learn_method : MoveLearnMethod
    version_group : VersionGroup
}