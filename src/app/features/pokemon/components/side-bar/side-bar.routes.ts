import { Route } from "@angular/router";

export const SIDEBAR_ROUTES : Route[] = [
    {
        path: 'stats',
        loadComponent: () => import('../stats/stats').then(m => m.Stats)

    },
    {
        path: 'moves',
        loadComponent: () => import('../../pages/pokemon-list/pokemon-details/pokemon-move-list/pokemon-move-list').then(m => m.PokemonMoveList)
    },{
        path: 'evolution',
        loadComponent: ()=> import('../evolution/evolution').then(m => m.Evolution)
    }

]