export enum GenValues {
  GenOne = 'gen-1',
  GenTwo = 'gen-2',
  GenThree = 'gen-3',
  GenFour = 'gen-4',
  GenFive = 'gen-5',
  GenSix = 'gen-6',
  GenSeven = 'gen-7',
  GenEight = 'gen-8',
  GenNine = 'gen-9',
}

export const GENERATION_RANGES: Record<GenValues, { offset: number; total: number }> = {
  [GenValues.GenOne]: { offset: 0, total: 151 },
  [GenValues.GenTwo]: { offset: 151, total: 100 },
  [GenValues.GenThree]: { offset: 251, total: 135 },
  [GenValues.GenFour]: { offset: 386, total: 107 },
  [GenValues.GenFive]: { offset: 493, total: 156 },
  [GenValues.GenSix]: { offset: 649, total: 72 },
  [GenValues.GenSeven]: { offset: 721, total: 88 },
  [GenValues.GenEight]: { offset: 809, total: 96 },
  [GenValues.GenNine]: { offset: 905, total: 120 },
};
