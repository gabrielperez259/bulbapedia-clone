import { Type } from "./types/type";
import { Sprite } from "./sprites/sprites";
import { Ability } from "./abilities/ability";


export interface Pokemon{
    id: number;
    name: string
    sprites : Sprite
    types: Type[]
    abilities: Ability[]
}       