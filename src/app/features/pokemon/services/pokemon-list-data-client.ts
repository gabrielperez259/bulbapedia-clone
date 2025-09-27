import { httpResource } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { GenValues } from "../../../shared/utils/gen-values";
import { PokemonPayload } from "../models/pokemon-payload";
@Injectable({
    providedIn: 'root'
})
export class PokemonListDataClient {
    
    #url = environment.apiUrl
    #initialValue = GenValues.GenOne

    public search = signal<string>(this.#initialValue); 

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

