import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvolutionChainDetails } from './evolution-chain-details';
import { createMockEvolutionDetail } from '../../../../../../testing/factories/evolution-factory';
import { EvolutionDetail } from '../../../models/evolution/evolution';
import { inputBinding, signal } from '@angular/core';

describe('EvolutionChainDetails', () => {
  let component: EvolutionChainDetails;
  let fixture: ComponentFixture<EvolutionChainDetails>;

  beforeEach(async () => {
    const mockEvolutionDetail = signal<EvolutionDetail>(createMockEvolutionDetail()); // mock factory aonde retorna min_level 16
    fixture = TestBed.createComponent(EvolutionChainDetails, {
      bindings: [ inputBinding('details', mockEvolutionDetail) ],
  });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should return expected min level', () => {

    // Verificação no Signal
    expect(component.details().min_level).toBe(16);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
