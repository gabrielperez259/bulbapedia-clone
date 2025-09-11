import { httpResource, HttpResourceRequest } from "@angular/common/http";
import { Injectable, Signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Pokemon } from "../models/pokemon";
import { PokemonPayload } from "../models/pokemon-payload";
import { signalDebouncing } from "../../../shared/utils/signal-debouncing";
@Injectable({
    providedIn: 'root'
})
export class PokemonResource {

    #url = environment.apiUrl

    public pokemonsData(search: Signal<string>) {

        const debouncedSearch = signalDebouncing(search, 500)
        return httpResource(() => {
            return {
                url: `${this.#url}/pokemon/${debouncedSearch()}`,
                responseType: 'json',
                method: 'GET'
            } as HttpResourceRequest
        }, {
            parse: (response: any) => {                
                return response as PokemonPayload
            },
            defaultValue: {
                results: []
            }

        })

    }

    public pokemonsDetailsResource(search: Signal<string >) {
        const debouncedSearch = signalDebouncing(search, 500)

        return httpResource(() => {
            return {
                url: `${this.#url}/pokemon/${debouncedSearch()}`,
                responseType: 'json',
                method: 'GET'
            } as HttpResourceRequest
        }, {
            parse: (response: any) => {               
                console.log(response)
                return response as Pokemon
                
            },
            defaultValue: {
                id: 0,
                name: '',
                sprites: {
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

