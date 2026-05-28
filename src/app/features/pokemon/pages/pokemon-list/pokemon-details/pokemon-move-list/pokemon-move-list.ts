import { Component, computed, inject, signal } from '@angular/core';
import { PokemonDetailsDataClient } from '../../../../services/pokemon-details.data-client';
import { Grid } from "../../../../../../shared/components/grid/grid";
import { MatButtonToggleGroup, MatButtonToggle } from "@angular/material/button-toggle";
import { ALL_VERSION_GROUPS, POKEMON_VERSION_GROUPS } from '../../../../../../shared/constants/version-group';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PokemonMoveDetails } from './pokemon-move-details/pokemon-move-details';
import { SortService } from '../../../../../../shared/services/sort-service';
import { CleanTextPipe } from "../../../../../../shared/pipes/clean-text.pipe";


@Component({
  selector: 'app-moves',
  imports: [
    Grid, 
    MatButtonToggleGroup, 
    MatButtonToggle, 
    FormsModule, 
    MatTableModule, 
    PokemonMoveDetails, 
    CleanTextPipe,    
  ],
  templateUrl: './pokemon-move-list.html',
  styleUrl: './pokemon-move-list.scss'
})
export class PokemonMoveList {

  moves = inject(PokemonDetailsDataClient).pokemonDetails()!.moves; 
  sortService = inject(SortService);

  public learnMethod = signal<string>('level-up');
  public version = signal<string>(POKEMON_VERSION_GROUPS.SCARLET_VIOLET);
  public versions = signal(ALL_VERSION_GROUPS); 

  public setLearnMethodValue(value: string) {
    this.learnMethod.set(value);
    
  }


  public setGenMoveValue(value: string) {
    this.version.set(value);

  }

computedMoveList = computed(() => {
  const currentVersion = this.version();
  const currentMethod = this.learnMethod();

  return this.moves
    .map((moveItem: any) => {
      // Encontra o detalhe que bate com a versão e o método selecionados
      const matchingDetail = moveItem.version_group_details.find((detail: any) => 
        detail.version_group.name === currentVersion && 
        detail.move_learn_method.name === currentMethod
      );

      if (!matchingDetail) return null;

      return {
        move: moveItem.move,
        level: matchingDetail.level_learned_at,
        method: matchingDetail.move_learn_method.name
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.level - b.level);
});

}








