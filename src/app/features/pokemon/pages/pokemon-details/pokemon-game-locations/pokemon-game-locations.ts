import { Component, computed, effect, inject } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../services/pokemon-details.data-client';
import { LocationAreaEncountersDataClient } from '../../../services/location-area-encounters-data-client';
import {
  GameLocationsCard,
  GenerationLocationsGroup,
} from '../../../components/game-locations-card/game-locations-card';
import {
  GENERATION_ORDER,
  VERSION_TO_GENERATION,
} from '../../../../../shared/constants/version-generation-map';

@Component({
  selector: 'app-pokemon-game-locations',
  standalone: true,
  imports: [GameLocationsCard],
  templateUrl: './pokemon-game-locations.html',
  styleUrl: './pokemon-game-locations.scss',
})
export class PokemonGameLocations {
  private pokemonDetailsData = inject(PokemonDetailsDataClient);
  public encountersDataClient = inject(LocationAreaEncountersDataClient);

  public encountersUrl = computed(
    () => this.pokemonDetailsData.pokemonLocationAreaEncountersUrl() ?? '',
  );
  public isLoading = computed(() => this.encountersDataClient.encountersLoading());
  public error = computed(() => this.encountersDataClient.encountersError());

  constructor() {
    effect(() => {
      const url = this.encountersUrl();
      if (url) {
        this.encountersDataClient.url.set(url);
      }
    });
  }

  public generationGroups = computed<GenerationLocationsGroup[]>(() => {
    const rawEncounters = this.encountersDataClient.encounters();
    if (!rawEncounters || rawEncounters.length === 0) return [];

    // Mapear gameVersion -> Set de location_areas
    const gameLocationsMap = new Map<string, Set<string>>();

    for (const item of rawEncounters) {
      const locName = item.location_area.name;
      for (const verDetail of item.version_details) {
        const verName = verDetail.version.name;
        if (!gameLocationsMap.has(verName)) {
          gameLocationsMap.set(verName, new Set());
        }
        gameLocationsMap.get(verName)!.add(locName);
      }
    }

    // Agrupar por geração: genKey -> Map<gameName, locations[]>
    const genGroupsMap = new Map<string, Map<string, string[]>>();

    gameLocationsMap.forEach((locSet, gameName) => {
      const genKey = VERSION_TO_GENERATION[gameName] || 'other';
      if (!genGroupsMap.has(genKey)) {
        genGroupsMap.set(genKey, new Map());
      }
      genGroupsMap.get(genKey)!.set(gameName, Array.from(locSet));
    });

    // Converter para array de GenerationLocationsGroup ordenados
    const groups: GenerationLocationsGroup[] = [];

    genGroupsMap.forEach((gamesMap, genKey) => {
      const genMeta = GENERATION_ORDER[genKey] || { order: 999, title: 'Outros Jogos' };
      const games = Array.from(gamesMap.entries()).map(([gameName, locations]) => ({
        gameName,
        locations,
      }));

      groups.push({
        generationTitle: genMeta.title,
        games,
      });
    });

    // Ordenar os grupos por geração (Gen 1 -> Gen 9)
    groups.sort((a, b) => {
      const orderA =
        Object.values(GENERATION_ORDER).find((g) => g.title === a.generationTitle)?.order ?? 999;
      const orderB =
        Object.values(GENERATION_ORDER).find((g) => g.title === b.generationTitle)?.order ?? 999;
      return orderA - orderB;
    });

    return groups;
  });
}
