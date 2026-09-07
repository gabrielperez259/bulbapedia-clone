import {  EvolutionDetail  } from "../../app/features/pokemon/models/evolution/evolution";
import { NamedApiResource } from "../../app/shared/models/api-resource";
import { createMockFactory } from "./factory-builder";


// ==========================================
// Mocks para os Tipos/Interfaces Auxiliares
// ==========================================


export const createMockSpecies = createMockFactory<NamedApiResource>(() => ({
  id: 25,
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon-species/25/'
}));

export const createMockTrigger = createMockFactory<NamedApiResource>(() => ({
  id: 1,
  name: 'level-up',
  url: 'https://pokeapi.co/api/v2/evolution-trigger/1/'
}));

// ==========================================
// Mock para a Interface Principal (EvolutionDetail)
// ==========================================

export const createMockEvolutionDetail = createMockFactory<EvolutionDetail>(() => ({
  base_form: null,
  base_form_id: null,
  gender: null,
  held_item: null,
  item: null,
  known_move: null,
  known_move_type: null,
  location: null,
  min_affection: null,
  min_beauty: null,
  min_damage_taken: null,
  min_happiness: null,
  min_level: 16,
  min_move_count: null,
  needs_overworld_rain: false,
  party_species: null,
  party_type: null,
  region: null,
  relative_physical_stats: null,
  time_of_day: '',
  trade_species: null,
  trigger: createMockTrigger(),
  turn_upside_down: false,
  evolves_to: [],
  is_baby: false,
  species: createMockSpecies(),
  used_move: null,
  used_move_type: null,
}));
     