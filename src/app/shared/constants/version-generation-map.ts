export interface GenerationMeta {
  order: number;
  title: string;
}

export const GENERATION_ORDER: Record<string, GenerationMeta> = {
  'gen-1': { order: 1, title: 'Generation I' },
  'gen-2': { order: 2, title: 'Generation II' },
  'gen-3': { order: 3, title: 'Generation III' },
  'gen-4': { order: 4, title: 'Generation IV' },
  'gen-5': { order: 5, title: 'Generation V' },
  'gen-6': { order: 6, title: 'Generation VI' },
  'gen-7': { order: 7, title: 'Generation VII' },
  'gen-8': { order: 8, title: 'Generation VIII' },
  'gen-9': { order: 9, title: 'Generation IX' },
};

export const SPRITE_VERSION_GENERATION: Record<string, string> = {
  'generation-i': 'gen-1',
  'generation-ii': 'gen-2',
  'generation-iii': 'gen-3',
  'generation-iv': 'gen-4',
  'generation-v': 'gen-5',
  'generation-vi': 'gen-6',
  'generation-vii': 'gen-7',
  'generation-viii': 'gen-8',
  'generation-ix': 'gen-9',
};

export const VERSION_TO_GENERATION: Record<string, string> = {
  // Gen 1
  red: 'gen-1',
  blue: 'gen-1',
  yellow: 'gen-1',

  // Gen 2
  gold: 'gen-2',
  silver: 'gen-2',
  crystal: 'gen-2',

  // Gen 3
  ruby: 'gen-3',
  sapphire: 'gen-3',
  emerald: 'gen-3',
  firered: 'gen-3',
  leafgreen: 'gen-3',

  // Gen 4
  diamond: 'gen-4',
  pearl: 'gen-4',
  platinum: 'gen-4',
  heartgold: 'gen-4',
  soulsilver: 'gen-4',

  // Gen 5
  black: 'gen-5',
  white: 'gen-5',
  'black-2': 'gen-5',
  'white-2': 'gen-5',

  // Gen 6
  x: 'gen-6',
  y: 'gen-6',
  'omega-ruby': 'gen-6',
  'alpha-sapphire': 'gen-6',

  // Gen 7
  sun: 'gen-7',
  moon: 'gen-7',
  'ultra-sun': 'gen-7',
  'ultra-moon': 'gen-7',
  'lets-go-pikachu': 'gen-7',
  'lets-go-eevee': 'gen-7',

  // Gen 8
  sword: 'gen-8',
  shield: 'gen-8',
  'brilliant-diamond': 'gen-8',
  'shining-pearl': 'gen-8',
  'legends-arceus': 'gen-8',

  // Gen 9
  scarlet: 'gen-9',
  violet: 'gen-9',
};
