import { Component, input } from '@angular/core';

@Component({
  selector: 'app-flex',
  imports: [],
  templateUrl: './flex.html',
  styleUrl: './flex.scss',
})
export class Flex {
  // TODO(#007) : Excluir esse componente após concluir as tarefas pendentes 003, 004 e 006. 
  display = input('flex');
  gap = input('10px');
}
