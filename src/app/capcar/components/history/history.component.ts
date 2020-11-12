import {
  Component,
  OnInit,
} from '@angular/core';

import { LocalStorageService } from '../../services/';

import { PlatesComponent } from '../plates';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  constructor(
    public localStorageService: LocalStorageService,
    private platesComponent: PlatesComponent
  ) { }

  ngOnInit(): void { }

  closeHistory() {
    this.localStorageService.historyOpen = false;
  }

  queryPlate(plate) {
    this.closeHistory();
    this.platesComponent.queryPlate(plate.split('-').join(""));
  }

}
