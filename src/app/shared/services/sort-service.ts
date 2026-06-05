import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  isUp = signal<boolean>(true);

  toogleState() {
    this.isUp.set(!this.isUp());
  }

  sortString(array: any[], property: string) {
    if (this.isUp()) {
      this.toogleState();
      return array.sort((a, b) => a[property].localeCompare(b[property]));
    } else {
      this.toogleState();
      return array.sort((a, b) => b[property].localeCompare(a[property]));
    }
  }

  sortBoolean(array: any[], property: string) {
    if (this.isUp()) {
      this.toogleState();
      return array.sort((a, b) => a[property] - b[property]);
    } else {
      this.toogleState();
      return array.sort((a, b) => b[property] - a[property]);
    }
  }

  sortNumber(array: any[], property: string) {
    if (this.isUp()) {
      this.toogleState();
      return array.sort((a, b) => a[property] - b[property]);
    } else {
      this.toogleState();
      return array.sort((a, b) => b[property] - a[property]);
    }
  }
}
