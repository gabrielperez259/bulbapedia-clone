import { computed, Service, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { httpResource } from "@angular/common/http";
import { AbilityFlavorTextEntry, AbilityRoot } from "../models/abilities/ability";

@Service()
export class AbilityDataClient {
    
    #url = environment.AbilitiesUrl;
    public abilityName = signal('');
    public abilityDetailsLoading = computed(() => this.#abilitiesResource.isLoading());
    public abilityDetailsError = computed(() => this.#abilitiesResource.error());
    public pokemonsWithAbility = computed(() => 
        this.#abilitiesResource.value()?.pokemon.map((p) => p.pokemon) ?? []
    );

    // Lógica para pegar textos em inglês e apenas 1 por grupo de versão (jogo)
    public abilityFlavorText = computed(() => {
        const data = this.#abilitiesResource.value();
        if (!data || !data.flavor_text_entries) return [];

        const englishEntries = data.flavor_text_entries.filter(
            (entry) => entry.language.name === 'en'
        );

        // Usamos um Map para garantir a unicidade usando o nome do version_group como chave
        const uniqueVersionsMap = new Map<string, AbilityFlavorTextEntry>();
        
        for (const entry of englishEntries) {
            if (!uniqueVersionsMap.has(entry.version_group.name)) {
                uniqueVersionsMap.set(entry.version_group.name, entry);
            }
        }

        return Array.from(uniqueVersionsMap.values());
    });

    #abilitiesResource = httpResource<AbilityRoot>(() => ({
        url: `${this.#url}${this.abilityName()}`,
        responseType: 'json',
        method: 'GET',
        cache: 'force-cache'
    }) )
}