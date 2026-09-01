import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-moves-side-bar',
  imports: [MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './moves-side-bar.html',
  styleUrl: './moves-side-bar.scss',
})
export class MovesSideBar {}
