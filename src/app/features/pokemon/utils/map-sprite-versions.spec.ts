import { describe, expect, it } from 'vitest';
import { mapSpriteVersionsToGroups } from './map-sprite-versions';
import { SpriteVersions } from '../models/sprites/sprites';

describe('mapSpriteVersionsToGroups', () => {
  it('should return an empty array when versions is missing', () => {
    expect(mapSpriteVersionsToGroups(undefined)).toEqual([]);
    expect(mapSpriteVersionsToGroups(null)).toEqual([]);
  });

  it('should omit null, undefined, empty, and non-string sprite values', () => {
    const versions: SpriteVersions = {
      'generation-i': {
        'red-blue': {
          front_default: 'https://example.com/front.png',
          back_default: null,
          front_shiny: '',
          back_shiny: undefined,
        },
      },
    };

    const groups = mapSpriteVersionsToGroups(versions);

    expect(groups).toHaveLength(1);
    expect(groups[0].games).toHaveLength(1);
    expect(groups[0].games[0].sprites).toEqual([
      { url: 'https://example.com/front.png', label: 'Front Default' },
    ]);
  });

  it('should skip games and generations that have none of the four sprites', () => {
    const versions: SpriteVersions = {
      'generation-i': {
        'red-blue': {
          front_default: null,
          back_default: null,
        },
        yellow: {
          front_gray: 'https://example.com/gray.png',
        },
      },
    };

    expect(mapSpriteVersionsToGroups(versions)).toEqual([]);
  });

  it('should ignore nested animated objects', () => {
    const versions: SpriteVersions = {
      'generation-v': {
        'black-white': {
          front_default: 'https://example.com/front.png',
          back_default: 'https://example.com/back.png',
          front_shiny: 'https://example.com/front-shiny.png',
          back_shiny: 'https://example.com/back-shiny.png',
          animated: {
            front_default: 'https://example.com/animated-front.gif',
            back_default: 'https://example.com/animated-back.gif',
          },
        },
      },
    };

    const groups = mapSpriteVersionsToGroups(versions);
    const labels = groups[0].games[0].sprites.map((sprite) => sprite.label);

    expect(labels).toEqual(['Front Default', 'Back Default', 'Front Shiny', 'Back Shiny']);
    expect(groups[0].games[0].sprites.some((sprite) => sprite.url.includes('animated'))).toBe(
      false,
    );
  });

  it('should keep generation I without shiny sprites when they do not exist', () => {
    const versions: SpriteVersions = {
      'generation-i': {
        'red-blue': {
          front_default: 'https://example.com/rb-front.png',
          back_default: 'https://example.com/rb-back.png',
        },
        yellow: {
          front_default: 'https://example.com/y-front.png',
          back_default: 'https://example.com/y-back.png',
        },
      },
    };

    const groups = mapSpriteVersionsToGroups(versions);

    expect(groups[0].generationTitle).toBe('Generation I');
    expect(groups[0].games.map((game) => game.gameName)).toEqual(['red-blue', 'yellow']);
    expect(groups[0].games[0].sprites.map((sprite) => sprite.label)).toEqual([
      'Front Default',
      'Back Default',
    ]);
  });

  it('should keep a game that only has front sprites', () => {
    const versions: SpriteVersions = {
      'generation-iii': {
        emerald: {
          front_default: 'https://example.com/emerald-front.png',
          front_shiny: 'https://example.com/emerald-front-shiny.png',
        },
      },
    };

    const sprites = mapSpriteVersionsToGroups(versions)[0].games[0].sprites;
    expect(sprites.map((sprite) => sprite.label)).toEqual(['Front Default', 'Front Shiny']);
  });

  it('should sort generations from I to IX regardless of object key order', () => {
    const versions: SpriteVersions = {
      'generation-ix': {
        'scarlet-violet': { front_default: 'https://example.com/sv.png' },
      },
      'generation-v': {
        'black-white': { front_default: 'https://example.com/bw.png' },
      },
      'generation-i': {
        yellow: { front_default: 'https://example.com/y.png' },
      },
    };

    const titles = mapSpriteVersionsToGroups(versions).map((group) => group.generationTitle);
    expect(titles).toEqual(['Generation I', 'Generation V', 'Generation IX']);
  });

  it.each([
    ['generation-vi', ['Generation VI', 'Generation VII', 'Generation VIII']],
    ['generation-vii', ['Generation VII', 'Generation VIII']],
    ['generation-viii', ['Generation VIII']],
  ])(
    'should discard sprite generations before a Pokémon introduced in %s',
    (introducedGeneration, expectedTitles) => {
      const versions: SpriteVersions = {
        'generation-v': {
          'black-white': { front_default: 'https://example.com/bw.png' },
        },
        'generation-vi': {
          'x-y': { front_default: 'https://example.com/xy.png' },
        },
        'generation-vii': {
          'ultra-sun-ultra-moon': { front_default: 'https://example.com/usum.png' },
        },
        'generation-viii': {
          'sword-shield': { front_default: 'https://example.com/swsh.png' },
        },
      };

      const titles = mapSpriteVersionsToGroups(versions, introducedGeneration).map(
        (group) => group.generationTitle,
      );

      expect(titles).toEqual(expectedTitles);
    },
  );
});
