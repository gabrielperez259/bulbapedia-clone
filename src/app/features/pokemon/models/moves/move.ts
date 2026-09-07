import { NamedApiResource } from "../../../../shared/models/api-resource";

export interface MoveVersionGroupDetails {
  level_learned_at: number;
  move_learn_method: NamedApiResource;
  version_group: NamedApiResource;
}

export interface Move {
  move: NamedApiResource;
  version_group_details: MoveVersionGroupDetails[];
}
