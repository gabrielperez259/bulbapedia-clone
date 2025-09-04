import { Type } from "./type";
import { Sprite } from "./sprites";

export interface Pokemon{
    id: number;
    name: string
    sprites : Sprite
    types: Type[]
}       