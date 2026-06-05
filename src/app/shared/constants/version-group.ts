export type PokemonVersionGroup =
  | 'red-blue'
  | 'yellow'
  | 'gold-silver'
  | 'crystal'
  | 'ruby-sapphire'
  | 'emerald'
  | 'firered-leafgreen'
  | 'diamond-pearl'
  | 'platinum'
  | 'heartgold-soulsilver'
  | 'black-white'
  | 'black-2-white-2'
  | 'x-y'
  | 'omega-ruby-alpha-sapphire'
  | 'sun-moon'
  | 'ultra-sun-ultra-moon'
  | 'lets-go-pikachu-lets-go-eevee'
  | 'sword-shield'
  | 'brilliant-diamond-shining-pearl'
  | 'legends-arceus'
  | 'scarlet-violet';

export const POKEMON_VERSION_GROUPS = {
  RED_BLUE: 'red-blue',
  YELLOW: 'yellow',
  GOLD_SILVER: 'gold-silver',
  CRYSTAL: 'crystal',
  RUBY_SAPPHIRE: 'ruby-sapphire',
  EMERALD: 'emerald',
  FIRERED_LEAFGREEN: 'firered-leafgreen',
  DIAMOND_PEARL: 'diamond-pearl',
  PLATINUM: 'platinum',
  HEARTGOLD_SOULSILVER: 'heartgold-soulsilver',
  BLACK_WHITE: 'black-white',
  BLACK_2_WHITE_2: 'black-2-white-2',
  X_Y: 'x-y',
  OMEGA_RUBY_ALPHA_SAPPHIRE: 'omega-ruby-alpha-sapphire',
  SUN_MOON: 'sun-moon',
  ULTRA_SUN_ULTRA_MOON: 'ultra-sun-ultra-moon',
  LETS_GO_PIKACHU_LETS_GO_EEVEE: 'lets-go-pikachu-lets-go-eevee',
  SWORD_SHIELD: 'sword-shield',
  BRILLIANT_DIAMOND_SHINING_PEARL: 'brilliant-diamond-shining-pearl',
  LEGENDS_ARCEUS: 'legends-arceus',
  SCARLET_VIOLET: 'scarlet-violet',
} as const;

export const ALL_VERSION_GROUPS: PokemonVersionGroup[] = Object.values(POKEMON_VERSION_GROUPS);
