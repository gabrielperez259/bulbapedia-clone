import { NamedApiResource } from "../../../../shared/models/api-resource";



// Interface principal para a Habilidade (Ability)
export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NamedApiResource;
  names: AbilityName[];
  effect_changes: any[]; // No JSON enviado está vazio, mas mapeia mudanças de efeitos entre gerações
  effect_entries: AbilityEffectEntry[];
  flavor_text_entries: AbilityFlavorTextEntry[];
  pokemon: PokemonWithAbility[];
}

// Subinterface para as traduções do nome da habilidade
export interface AbilityName {
  name: string;
  language: NamedApiResource;
}

// Subinterface para as descrições longas e curtas do efeito
export interface AbilityEffectEntry {
  effect: string;
  short_effect: string;
  language: NamedApiResource;
}

// Subinterface para os textos de descrição dos jogos (Flavor Text)
export interface AbilityFlavorTextEntry {
  flavor_text: string;
  language: NamedApiResource;
  version_group: NamedApiResource;
}

// Subinterface para a lista de Pokémons que possuem essa habilidade
export interface PokemonWithAbility {
  is_hidden: boolean;
  slot: number;
  pokemon: NamedApiResource;
}
