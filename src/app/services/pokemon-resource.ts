import { httpResource, HttpResourceRequest } from "@angular/common/http";
import { Injectable, Signal, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { PokemonPayload } from "../models/pokemon-payload";

@Injectable({
    providedIn: 'root'
})
export class PokemonResource {

    #url = environment.apiUrl   

    public pokemonsData(search : Signal<string>, genValue : Signal< string>) {



        return httpResource(() => {
            return {
                url: `${this.#url}/pokemon/${search()}?${genValue()}`,                
                responseType: 'json',
                method: 'GET'
            } as HttpResourceRequest
        },{
            parse: (response : any) => {
                console.log(response.results[0].name)
                return response as PokemonPayload
            },
            defaultValue: {
                results: []
            }
            
        })

    }

}

