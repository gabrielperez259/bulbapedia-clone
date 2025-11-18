import { Route } from "@angular/router";

export const SIDEBAR_ROUTES : Route[] = [
    {
        path: 'stats',
        loadComponent: () => import('../stats/stats').then(m => m.Stats)

    },
    {
        path: 'moves',
        loadComponent: () => import('../moves/moves').then(m => m.Moves)
    }

]