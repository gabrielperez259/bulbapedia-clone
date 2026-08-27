import { Other } from './other';

export interface SpriteVersionSet {
  front_default?: string | null;
  back_default?: string | null;
  front_shiny?: string | null;
  back_shiny?: string | null;
  animated?: SpriteVersionSet;
  [key: string]: string | SpriteVersionSet | null | undefined;
}

export type SpriteVersionGames = Record<string, SpriteVersionSet>;
export type SpriteVersions = Record<string, SpriteVersionGames>;

export interface Sprite {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  other?: Other;
  versions?: SpriteVersions;
}
