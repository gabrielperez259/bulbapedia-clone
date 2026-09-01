export const ABILITY_ROUTE = [
    {
        path: ':name',
        loadComponent : () => import('./ability-details/ability-details').then((m) => m.AbilityDetails),
    },
];