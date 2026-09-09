import {
  ALL_VERSION_GROUPS,
  MainSeriesVersionGroup,
} from '../../../../shared/constants/version-group';
import { ApiResourceReference, NamedApiResource } from '../../../../shared/models/api-resource';
import { FlavorTextEntry } from '../../../../shared/models/flavor-text-entry';
import { ContestCombo  } from '../contest/contest.interface';




interface MoveEffectEntry {
  effect: string;
  short_effect: string;
  language: NamedApiResource;
}

interface Machine {
  machine: ApiResourceReference;
  version_group: NamedApiResource;
}
export interface MoveDetails {
  name: string;
  power: number | null;
  pp: number;
  priority: number;
  type: NamedApiResource;
  accuracy: number | null;
  effect_chance: number | null;
  effect_entries: MoveEffectEntry[];
  damage_class: NamedApiResource;
  past_values: PastMoveValues[];
  generation: NamedApiResource;
  contest_combos: ContestCombo;
  contest_type: NamedApiResource;
  contest_effect: ApiResourceReference;
  super_contest_effect: ApiResourceReference;
  machines: Machine[];
  flavor_text_entries: FlavorTextEntry[];
  learned_by_pokemon: NamedApiResource[];
  target: NamedApiResource;
}

export interface PastMoveValues {
  accuracy: number | null;
  effect_chance: number | null;
  effect_entries: MoveEffectEntry[];
  power: number | null;
  pp: number | null;
  type: NamedApiResource | null;
  version_group: NamedApiResource;
}

/**
 * Applies the historical value range that contains the selected version group.
 * PokeAPI associates each entry with the last version group that used those values.
 * A null field means its current value was unchanged in that range.
 */
export function resolveMoveDetailsForVersionGroup(
  moveDetails: MoveDetails | undefined,
  versionGroup: string,
): MoveDetails | undefined {
  if (!moveDetails) return undefined;

  const selectedVersionIndex = ALL_VERSION_GROUPS.indexOf(versionGroup as MainSeriesVersionGroup);
  if (selectedVersionIndex === -1) return moveDetails;

  const pastValues = moveDetails.past_values
    .filter((value) => {
      const historicalVersionIndex = ALL_VERSION_GROUPS.indexOf(
        value.version_group.name as MainSeriesVersionGroup,
      );

      return historicalVersionIndex >= selectedVersionIndex;
    })
    .sort(
      (first, second) =>
        ALL_VERSION_GROUPS.indexOf(first.version_group.name as MainSeriesVersionGroup) -
        ALL_VERSION_GROUPS.indexOf(second.version_group.name as MainSeriesVersionGroup),
    )[0];

  if (!pastValues) return moveDetails;

  const { version_group: _versionGroup, ...historicalValues } = pastValues;
  const changedValues = Object.fromEntries(
    Object.entries(historicalValues).filter(([, value]) => value !== null),
  );

  return { ...moveDetails, ...changedValues };
}
