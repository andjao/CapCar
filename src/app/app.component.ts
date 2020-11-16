import {
  Component,
} from '@angular/core';

import {
  SharedService,
  LocalStorageService,
} from './capcar/'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public sharedService: SharedService,
    public localStorageService: LocalStorageService,
  ) { }

  title = 'CapCar';

  mySidenav: boolean = false;

  openNav() {
    this.mySidenav = true;
  }

  closeNav() {
    this.mySidenav = false;
  }

  history() {
    this.closeNav();
    this.sharedService.historyOpen = true;
    this.sharedService.history = JSON.parse(this.localStorageService.loadLocalStorage('history'));
  }

  darkMode() {
    this.closeNav();
  }

  policy() {
    this.closeNav();
  }

  contact() {
    this.closeNav();
  }
}
