import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  http = inject(HttpClient);
  getPokemon() {
    return this.http.get<Pokemon>(environment.apiUrl + '/pokemon/charizard');
  }
}
