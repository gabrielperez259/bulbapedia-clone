export type MockFactory<T> = {
  // Sobrecarga 1: Passou um array de overrides -> Retorna um array T[]
  (overrides: Partial<T>[]): T[];
  // Sobrecarga 2: Passou um número -> Gera N instâncias padrão
  (count: number, overrides?: Partial<T>): T[];
  // Sobrecarga 3: Passou um override único (ou nada) -> Retorna um único T
  (overrides?: Partial<T>): T;
};

export function createMockFactory<T>(defaultValues: T | (() => T)): MockFactory<T> {
  // Função auxiliar para gerar um único item
  const createSingle = (overrides?: Partial<T>): T => {
    const defaults =
      typeof defaultValues === 'function'
        ? (defaultValues as () => T)()
        : Array.isArray(defaultValues)
        ? ([...defaultValues] as unknown as T)
        : { ...defaultValues };

    return {
      ...defaults,
      ...overrides,
    };
  };

  return (overridesOrCount?: Partial<T> | Partial<T>[] | number, singleOverride?: Partial<T>): any => {
    // 1. Se for um número: cria N mocks repetindo a factory
    if (typeof overridesOrCount === 'number') {
      return Array.from({ length: overridesOrCount }, () => createSingle(singleOverride));
    }

    // 2. Se for um array de overrides: cria um mock para cada elemento
    if (Array.isArray(overridesOrCount)) {
      return overridesOrCount.map((override) => createSingle(override));
    }

    // 3. Comportamento padrão: objeto único
    return createSingle(overridesOrCount);
  };
}
