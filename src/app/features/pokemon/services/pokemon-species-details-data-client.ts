import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { httpResource } from "@angular/common/http";
import { Specie } from "../models/species/specie";


@Injectable({
    providedIn: 'root'
})

export class PokemonSpeciesDetailsDataClient {
    

    #url = environment.apiUrl

    public search = signal('');        
    
    public pokemonSpeciesDetails = computed(() => this.#pokemonSpeciesDetailsResource.value());
    public specieVarieties = computed(() => this.#pokemonSpeciesDetailsResource.value()?.varieties)
    public pokemonSpeciesDetailsLoading = computed(() => this.#pokemonSpeciesDetailsResource.isLoading());
    public pokemonSpeciesDetailsError = computed(() => this.#pokemonSpeciesDetailsResource.error());


    readonly  #pokemonSpeciesDetailsResource = httpResource<Specie>(() => ({
        url: `${this.#url}${this.search()}`,
        responseType: 'json',
        method: 'GET'       

    }))
   

    




}


