import { NamedApiResource } from "../../../../shared/models/api-resource";
import { FlavorTextEntry } from "../../../../shared/models/flavor-text-entry";

type EffectEntry = {
    effect: string;
    language: NamedApiResource;
};



type ContestName = {
    name: string;
    color: string;
    language: NamedApiResource;
};

type ContestComboDetail = {
    use_before: NamedApiResource[] | null;
    use_after: NamedApiResource[] | null;
};

export interface ContestCombo  {
    normal: ContestComboDetail;
    super: ContestComboDetail;
};

export interface ContestType {
    id: number;
    name: string;
    berry_flavor: NamedApiResource;
    names: ContestName[];
};

export interface ContestEffect  {
    id: number;
    appeal: number;
    jam: number;
    effect_entries: EffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
};

export interface SuperContestEffect  {
    id: number;
    appeal: number;
    flavor_text_entries: FlavorTextEntry[];
    moves: NamedApiResource[];
};