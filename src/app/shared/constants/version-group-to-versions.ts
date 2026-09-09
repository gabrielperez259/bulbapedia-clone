/**
 * Maps each PokeAPI version-group name to the individual game version names it contains.
 * Used to expand version groups into individual game rows in the game-locations card.
 */
export const VERSION_GROUP_TO_VERSIONS: Record<string, string[]> = {
  'red-blue': ['red', 'blue'],
  yellow: ['yellow'],
  'gold-silver': ['gold', 'silver'],
  crystal: ['crystal'],
  'ruby-sapphire': ['ruby', 'sapphire'],
  emerald: ['emerald'],
  'firered-leafgreen': ['firered', 'leafgreen'],
  'diamond-pearl': ['diamond', 'pearl'],
  platinum: ['platinum'],
  'heartgold-soulsilver': ['heartgold', 'soulsilver'],
  'black-white': ['black', 'white'],
  'black-2-white-2': ['black-2', 'white-2'],
  'x-y': ['x', 'y'],
  'omega-ruby-alpha-sapphire': ['omega-ruby', 'alpha-sapphire'],
  'sun-moon': ['sun', 'moon'],
  'ultra-sun-ultra-moon': ['ultra-sun', 'ultra-moon'],
  'lets-go-pikachu-lets-go-eevee': ['lets-go-pikachu', 'lets-go-eevee'],
  'sword-shield': ['sword', 'shield'],
  'brilliant-diamond-shining-pearl': ['brilliant-diamond', 'shining-pearl'],
  'legends-arceus': ['legends-arceus'],
  'scarlet-violet': ['scarlet', 'violet'],
  
};

/**
 * Returns the individual version names for a given version group.
 * Falls back to an array containing the version group name itself if not found.
 */
export function getVersionsForVersionGroup(versionGroup: string): string[] {
  return VERSION_GROUP_TO_VERSIONS[versionGroup] ?? [versionGroup];
}
