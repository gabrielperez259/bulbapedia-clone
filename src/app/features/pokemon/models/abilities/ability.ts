export interface NamedAPIResource {
  name: string;
  url: string;
}

// Interface principal para a Habilidade (Ability)
export interface AbilityRoot {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NamedAPIResource;
  names: AbilityName[];
  effect_changes: any[]; // No JSON enviado está vazio, mas mapeia mudanças de efeitos entre gerações
  effect_entries: AbilityEffectEntry[];
  flavor_text_entries: AbilityFlavorTextEntry[];
  pokemon: AbilityPokemon[];
}

// Subinterface para as traduções do nome da habilidade
export interface AbilityName {
  name: string;
  language: NamedAPIResource;
}

// Subinterface para as descrições longas e curtas do efeito
export interface AbilityEffectEntry {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

// Subinterface para os textos de descrição dos jogos (Flavor Text)
export interface AbilityFlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

// Subinterface para a lista de Pokémons que possuem essa habilidade
export interface AbilityPokemon {
  is_hidden: boolean;
  slot: number;
  pokemon: NamedAPIResource;
}
export interface PoKemonAbilityList {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
