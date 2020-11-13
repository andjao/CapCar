import {
  Component,
  OnInit,
} from '@angular/core';

import {
  SharedService,
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
    private platesComponent: PlatesComponent
  ) { }

  ngOnInit(): void { }

  closeHistory() {
    this.sharedService.historyOpen = false;
  }

  queryPlate(plate) {
    this.closeHistory();
    this.platesComponent.queryPlate(plate.split('-').join(""));
  }

}
