import { computed, Injectable, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { httpResource } from "@angular/common/http";
import { Specie } from "../models/species/specie";

@Injectable({
    providedIn: 'root'
})

export class PokemonSpeciesDetailsDataClient {
    

    #url = environment.speciesUrl;

    public search = signal('');        
    
    public pokemonSpeciesDetails = computed(() => this.#pokemonSpeciesDetailsResource.value());
    public varietiesNames = computed(() => this.#pokemonSpeciesDetailsResource.value()?.varieties.map( (variety) => variety.pokemon.name as string));
    public pokemonSpeciesDetailsLoading = computed(() => this.#pokemonSpeciesDetailsResource.isLoading());
    public pokemonSpeciesDetailsError = computed(() => this.#pokemonSpeciesDetailsResource.error());


    readonly  #pokemonSpeciesDetailsResource = httpResource<Specie>(() => ({
        url: `${this.#url}${this.search()}`,
        responseType: 'json',
        method: 'GET'       

    }))
   

    




}


