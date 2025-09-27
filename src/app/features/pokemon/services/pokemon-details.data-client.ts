import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { httpResource } from "@angular/common/http";
import { Pokemon } from "../models/pokemon";



@Injectable({
    providedIn: 'root'
})

export class PokemonDetailsDataClient {
    #url = environment.apiUrl 

    public search = signal('');        
    
    public pokemonDetails = computed(() => this.#pokemonDeatilsResource.value());
    public pokemonDetailsLoading = computed(() => this.#pokemonDeatilsResource.isLoading());
    public pokemonDetailsError = computed(() => this.#pokemonDeatilsResource.error());
    
    readonly #pokemonDeatilsResource = httpResource<Pokemon>(() => ({
        url: `${this.#url}${this.search()}`,
        responseType: 'json',
        method: 'GET',        
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
    }))


}