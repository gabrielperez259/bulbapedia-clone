import { httpResource } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { PokemonPayload } from "../models/pokemon/pokemon-payload";
import { GenValues } from "../../../shared/utils/gen-values";
@Injectable({
    providedIn: 'root'
})
export class PokemonListDataClient {
    
    #url = environment.apiUrl
    #initialValue = GenValues.GenOne

    public search = signal(this.#initialValue); 

    public pokemonList = computed(() => this.#pokemonListResource.value()!.results);
    public pokemonListLoading = computed(() => this.#pokemonListResource.isLoading());
    public pokemonListError = computed(() => this.#pokemonListResource.error());

    readonly #pokemonListResource = httpResource<PokemonPayload>(() => ({
            url: `${this.#url}${this.search()}`,
            responseType: 'json',
            method: 'GET',
            defaultValue: {
                results: []
            }
            
    }))

}

