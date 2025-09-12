import { httpResource, HttpResourceRequest } from "@angular/common/http";
import { computed, Injectable, signal, Signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Pokemon } from "../models/pokemon";
import { PokemonPayload } from "../models/pokemon-payload";
import { signalDebouncing } from "../../../shared/utils/signal-debouncing";
@Injectable({
    providedIn: 'root'
})
export class PokemonListDataClient {

    #url = environment.apiUrl
    #initialValue = '?offset=0&limit=151'
    public search = signal(this.#initialValue);    
    private debouncedSearch = signalDebouncing(this.search, 500)

    readonly pokemonListResource = httpResource<PokemonPayload>(() => ({
            url: `${this.#url}/pokemon/${this.debouncedSearch()}`,
            responseType: 'json',
            method: 'GET',
            defaultValue: {
                results: []
            }
            
    }))

    public pokemonList = computed(() => this.pokemonListResource.value()!.results);
    public pokemonListLoading = computed(() => this.pokemonListResource.isLoading());
    public pokemonListError = computed(() => this.pokemonListResource.error());


}

