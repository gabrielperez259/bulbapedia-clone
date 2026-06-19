export const ABILITY_ROUTE = [
    {
        path: '',
        loadComponent : () => import('./ability-details/ability-details').then((m) => m.AbilityDetails),
    },
];