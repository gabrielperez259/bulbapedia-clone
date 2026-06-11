import { Component, input } from '@angular/core';
import { EvolutionChain, EvolutionDetail } from '../../../models/evolution/evolution';
import { CleanTextPipe } from "../../../../../shared/pipes/clean-text.pipe";

@Component({
  selector: 'app-evolution-chain-details',
  imports: [CleanTextPipe],
  templateUrl: './evolution-chain-details.html',
  styleUrl: './evolution-chain-details.scss',
})
export class EvolutionChainDetails {
  
  details = input.required<EvolutionDetail>()
}
