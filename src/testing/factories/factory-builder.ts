/**
 * Utilitário para criar factories fortemente tipadas com suporte a overrides parciais.
 */
export type MockFactory<T> = (overrides?: Partial<T>) => T;

export function createMockFactory<T>(defaultValues: T | (() => T)): MockFactory<T> {
  return (overrides?: Partial<T>): T => {
    // Se defaultValues for função, executa para gerar novos objetos/arrays (evita referência compartilhada)
    const defaults =
      typeof defaultValues === 'function' ? (defaultValues as () => T)() : { ...defaultValues };

    return {
      ...defaults,
      ...overrides,
    };
  };
}
