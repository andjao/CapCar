import {
  Component,
  OnInit,
} from '@angular/core';

import {
  SharedService,
  LocalStorageService
} from '../../services/';

import { PlatesComponent } from '../plates';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private platesComponent: PlatesComponent
  ) { }

  ngOnInit(): void {
  }

  closeHistory() {
    this.sharedService.historyOpen = false;
  }

  queryPlate(car) {
    this.closeHistory();
    if (car.mercosul) {
      this.sharedService.mercoSul = true;
      this.sharedService.plateMercoSul = car.placa;
    } else {
      this.sharedService.mercoSul = false;
      this.sharedService.plateNational = car.placa;
    }
    this.sharedService.queryBtn = true;
    this.platesComponent.queryPlate();
  }

  removePlate(plate) {
    this.localStorageService.removeLocalStorage("history", plate);
    this.sharedService.history = JSON.parse(this.localStorageService.loadLocalStorage("history"));
  }
}