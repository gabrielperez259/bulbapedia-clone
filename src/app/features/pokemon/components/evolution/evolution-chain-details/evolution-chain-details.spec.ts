import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionChainDetails } from './evolution-chain-details';
import { createMockEvolutionDetail } from '../../../../../../testing/factories/evolution-factory';

describe('EvolutionChainDetails', () => {
  let component: EvolutionChainDetails;
  let fixture: ComponentFixture<EvolutionChainDetails>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(EvolutionChainDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  const details = createMockEvolutionDetail();

  it('deve aplicar e atualizar o valor do Signal Input usando setInput', () => {
    // 1. Criamos o mock com o valor desejado
    const mockEvolution = createMockEvolutionDetail();

    // 2. Aplicamos o mock no Signal Input do componente
    fixture.componentRef.setInput('evolutionDetail', mockEvolution);

    // 3. Processamos as mudanças no DOM/Template
    fixture.detectChanges();

    // Verificação no Signal
    expect(component.details().min_level).toBe(16);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
