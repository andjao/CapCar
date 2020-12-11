import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
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
export class AppComponent implements OnInit {

  env = environment;

  constructor(
    public sharedService: SharedService,
    public localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    const darkMode = JSON.parse(this.localStorageService.loadLocalStorage('darkMode'));
    if (darkMode) {
      this.sharedService.darkMode = true;
    }
    else if (darkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.sharedService.darkMode = false;
      this.darkMode();
      this.sharedService.darkMode = true;
    }
    else {
      this.sharedService.darkMode = false;
    }
  }

  title = 'CapCar';

  sideNav: boolean = false;

  @ViewChild('capcar') capcar: ElementRef;

  openNav() {
    this.sideNav = true;
  }

  closeNav() {
    this.sideNav = false;
    this.capcar.nativeElement.src = "assets/images/capcar.svg";
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
    this.sharedService.privacyPolicies = true;
  }

  contact() {
    this.closeNav();
    this.sharedService.contactON = true;
  }

  easterEgg() {
    this.capcar.nativeElement.src = "assets/images/capcarA.svg";
  }
}
