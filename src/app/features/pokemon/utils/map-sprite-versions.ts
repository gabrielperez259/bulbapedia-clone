import {
  GENERATION_ORDER,
  SPRITE_VERSION_GENERATION,
} from '../../../shared/constants/version-generation-map';
import { SpriteVersionSet, SpriteVersions } from '../models/sprites/sprites';
import {
  GameSpriteGroup,
  GenerationSpriteGroup,
  SpriteGroupItem,
} from '../components/generation-sprites-card/generation-sprites-card';

const SPRITE_FIELDS: {
  key: 'front_default' | 'back_default' | 'front_shiny' | 'back_shiny';
  label: string;
}[] = [
  { key: 'front_default', label: 'Front Default' },
  { key: 'back_default', label: 'Back Default' },
  { key: 'front_shiny', label: 'Front Shiny' },
  { key: 'back_shiny', label: 'Back Shiny' },
];

function isSpriteUrl(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function spritesFromVersionSet(set: SpriteVersionSet | undefined): SpriteGroupItem[] {
  if (!set) return [];

  const items: SpriteGroupItem[] = [];
  for (const field of SPRITE_FIELDS) {
    const value = set[field.key];
    if (isSpriteUrl(value)) {
      items.push({ url: value, label: field.label });
    }
  }
  return items;
}

function gamesFromGeneration(
  games: Record<string, SpriteVersionSet> | undefined,
): GameSpriteGroup[] {
  if (!games) return [];

  const groups: GameSpriteGroup[] = [];
  for (const [gameName, spriteSet] of Object.entries(games)) {
    const sprites = spritesFromVersionSet(spriteSet);
    if (sprites.length > 0) {
      groups.push({ gameName, sprites });
    }
  }
  return groups;
}

export function mapSpriteVersionsToGroups(
  versions: SpriteVersions | null | undefined,
  introducedGeneration?: string,
): GenerationSpriteGroup[] {
  if (!versions) return [];

  const introducedGenerationKey = introducedGeneration
    ? SPRITE_VERSION_GENERATION[introducedGeneration]
    : undefined;
  const introducedGenerationOrder = introducedGenerationKey
    ? GENERATION_ORDER[introducedGenerationKey]?.order
    : undefined;
  const groups: (GenerationSpriteGroup & { order: number })[] = [];

  for (const [generationKey, games] of Object.entries(versions)) {
    const genKey = SPRITE_VERSION_GENERATION[generationKey];
    const genMeta = genKey ? GENERATION_ORDER[genKey] : undefined;
    if (
      introducedGenerationOrder !== undefined &&
      (genMeta?.order ?? 999) < introducedGenerationOrder
    ) {
      continue;
    }

    const gameGroups = gamesFromGeneration(games);
    if (gameGroups.length === 0) continue;

    groups.push({
      generationTitle: genMeta?.title ?? generationKey,
      games: gameGroups,
      order: genMeta?.order ?? 999,
    });
  }

  groups.sort((a, b) => a.order - b.order);

  return groups.map(({ generationTitle, games }) => ({ generationTitle, games }));
}
