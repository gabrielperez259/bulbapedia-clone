/**
 * Maps each Pokémon game version name (as returned by PokeAPI) to a branding color.
 * Used to style game badges in the game-locations-card component.
 */
export enum GameVersionColor {
  // Gen 1
  Red = '#c03028',
  Blue = '#3860d0',
  Yellow = '#e8b820',

  // Gen 2
  Gold = '#b8860b',
  Silver = '#a8a8c0',
  Crystal = '#4fc4cf',

  // Gen 3
  Ruby = '#a00000',
  Sapphire = '#0050a0',
  Emerald = '#00a040',
  Firered = '#e03020',
  Leafgreen = '#38b840',

  // Gen 4
  Diamond = '#8080c0',
  Pearl = '#e8a0b0',
  Platinum = '#6e7880',
  Heartgold = '#e8a000',
  Soulsilver = '#a0a8b8',

  // Gen 5
  Black = '#303030',
  White = '#d8d8d8',
  Black2 = '#484848',
  White2 = '#c8c8c8',

  // Gen 6
  X = '#1a70c0',
  Y = '#c02020',
  OmegaRuby = '#b02000',
  AlphaSapphire = '#0038a8',

  // Gen 7
  Sun = '#f08020',
  Moon = '#6848a8',
  UltraSun = '#e86018',
  UltraMoon = '#4828a0',
  LetsGoPikachu = '#f8c800',
  LetsGoEevee = '#c8a060',

  // Gen 8
  Sword = '#5588e0',
  Shield = '#e05050',
  BrilliantDiamond = '#80a0d8',
  ShiningPearl = '#e8b0c0',
  LegendsArceus = '#8060a0',

  // Gen 9
  Scarlet = '#d04020',
  Violet = '#7830c0',

  // Fallback
  Default = '#6366f1',
}

export const GAME_VERSION_COLORS: Record<string, string> = {
  red: GameVersionColor.Red,
  blue: GameVersionColor.Blue,
  yellow: GameVersionColor.Yellow,

  gold: GameVersionColor.Gold,
  silver: GameVersionColor.Silver,
  crystal: GameVersionColor.Crystal,

  ruby: GameVersionColor.Ruby,
  sapphire: GameVersionColor.Sapphire,
  emerald: GameVersionColor.Emerald,
  firered: GameVersionColor.Firered,
  leafgreen: GameVersionColor.Leafgreen,

  diamond: GameVersionColor.Diamond,
  pearl: GameVersionColor.Pearl,
  platinum: GameVersionColor.Platinum,
  heartgold: GameVersionColor.Heartgold,
  soulsilver: GameVersionColor.Soulsilver,

  black: GameVersionColor.Black,
  white: GameVersionColor.White,
  'black-2': GameVersionColor.Black2,
  'white-2': GameVersionColor.White2,

  x: GameVersionColor.X,
  y: GameVersionColor.Y,
  'omega-ruby': GameVersionColor.OmegaRuby,
  'alpha-sapphire': GameVersionColor.AlphaSapphire,

  sun: GameVersionColor.Sun,
  moon: GameVersionColor.Moon,
  'ultra-sun': GameVersionColor.UltraSun,
  'ultra-moon': GameVersionColor.UltraMoon,
  'lets-go-pikachu': GameVersionColor.LetsGoPikachu,
  'lets-go-eevee': GameVersionColor.LetsGoEevee,

  sword: GameVersionColor.Sword,
  shield: GameVersionColor.Shield,
  'brilliant-diamond': GameVersionColor.BrilliantDiamond,
  'shining-pearl': GameVersionColor.ShiningPearl,
  'legends-arceus': GameVersionColor.LegendsArceus,

  scarlet: GameVersionColor.Scarlet,
  violet: GameVersionColor.Violet,
};

/**
 * Returns the branding color for the given game version name.
 * Falls back to the accent color if not found.
 */
export function getGameVersionColor(gameName: string): string {
  return GAME_VERSION_COLORS[gameName] ?? GameVersionColor.Default;
}
