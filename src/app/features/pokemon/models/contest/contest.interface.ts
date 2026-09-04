import { NamedApiResource } from '../../../../shared/models/named-api-resource';

type EffectEntry = {
    effect: string;
    language: NamedApiResource;
};

type FlavorTextEntry = {
    flavor_text: string;
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

export type ContestCombo = {
    normal: ContestComboDetail;
    super: ContestComboDetail;
};

export type ContestType = {
    id: number;
    name: string;
    berry_flavor: NamedApiResource;
    names: ContestName[];
};

export type ContestEffect = {
    id: number;
    appeal: number;
    jam: number;
    effect_entries: EffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
};

export type SuperContestEffect = {
    id: number;
    appeal: number;
    flavor_text_entries: FlavorTextEntry[];
    moves: NamedApiResource[];
};