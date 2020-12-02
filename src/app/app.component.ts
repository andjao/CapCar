import {
  Component,
  OnInit,
} from '@angular/core';

import { environment } from '../environments/environment';

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

  env = environment;

  constructor(
    public sharedService: SharedService,
    public localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (JSON.parse(this.localStorageService.loadLocalStorage('darkMode'))) {
      this.sharedService.darkMode = true;
    } else {
      this.sharedService.darkMode = false;
    }
  }

  title = 'CapCar';

  sideNav: boolean = false;

  openNav() {
    this.sideNav = true;
  }

  closeNav() {
    this.sideNav = false;
  }

  history() {
    this.closeNav();
    this.sharedService.historyOpen = true;
    this.sharedService.history = JSON.parse(this.localStorageService.loadLocalStorage('history'));
  }

  darkMode() {
    this.localStorageService.saveLocalStorage('darkMode', !this.sharedService.darkMode, { type: "", mercosul: "" })
  }

  policy() {
    this.closeNav();
    this.sharedService.privacyPolicies = false;
  }

  contact() {
    this.closeNav();
  }
}
