
import { signal } from "@angular/core";
import { PokemonAbilityList } from "../../app/features/pokemon/models/abilities/ability";
import { Pokemon } from "../../app/features/pokemon/models/pokemon";
import { createMockFactory } from "./factory-builder";

export const createMockPokemonAbilities =  signal<Pokemon['abilities']>([
    {
      is_hidden: false,
      slot: 1,
      ability: {
        name: 'ability-one',
        url: 'https://pokeapi.co/api/v2/ability/1/'
      }
    },
    {
      is_hidden: false,
      slot: 2,
      ability: {
        name: 'ability-two',
        url: 'https://pokeapi.co/api/v2/ability/2/'
      }
    }
  ]);