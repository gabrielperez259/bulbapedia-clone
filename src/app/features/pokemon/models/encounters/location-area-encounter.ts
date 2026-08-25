export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface EncounterMethod {
  name: string;
  url: string;
}

export interface EncounterConditionValue {
  name: string;
  url: string;
}

export interface Encounter {
  min_level: number;
  max_level: number;
  chance: number;
  method: EncounterMethod;
  condition_values: EncounterConditionValue[];
}

export interface VersionEncounterDetail {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: Encounter[];
}

export interface LocationAreaEncounter {
  location_area: NamedAPIResource;
  version_details: VersionEncounterDetail[];
}
