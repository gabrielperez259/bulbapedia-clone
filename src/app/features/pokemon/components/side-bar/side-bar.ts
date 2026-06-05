import { Component, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-side-bar',
  imports: [MatMenuModule, RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  pokemon = input.required<Pokemon | undefined>();
}
