import { Type } from "./type";
import { Sprite } from "./sprites/sprites";

export interface Pokemon{
    id: number;
    name: string
    sprites : Sprite
    types: Type[]
}       