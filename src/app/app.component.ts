import {
  Component,
  OnInit,
  Optional,
} from '@angular/core';

import {
  SharedService,
  LocalStorageService,
  MetadataService
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
    @Optional() public metadataService: MetadataService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (this.metadataService) {
      this.metadataService.updateMetadata({});
    }

    if (JSON.parse(this.localStorageService.loadLocalStorage('darkMode'))) {
      this.sharedService.darkMode = true;
    } else {
      this.sharedService.darkMode = false;
    }
  }

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
