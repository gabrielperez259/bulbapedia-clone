import { httpResource, HttpResourceRequest } from "@angular/common/http";
import { Injectable, Signal, signal } from "@angular/core";
import { Pokemon } from "../models/pokemon";

@Injectable({
    providedIn: 'root'
})
export class PokemonResource {

    public search(search: Signal<string>) {
        return httpResource(() => {
            return {
                url: `https://pokeapi.co/api/v2/pokemon/${search()}`,                
                responseType: 'json',
                method: 'GET'
            } as HttpResourceRequest
        },{
            parse: (response) => {
                return response as Pokemon
            },defaultValue: {
                id: 0,
                name: '',
                sprites : {
                    back_default: '',
                    back_female: '',
                    back_shiny: '',
                    back_shiny_female: '',
                    front_default: '',
                    front_female: '',
                    front_shiny: '',
                    front_shiny_female: ''
                },
                types: []

            }
        })

    }

}

