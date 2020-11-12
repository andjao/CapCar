import {
  Component,
  OnInit,
} from '@angular/core';

import { LocalStorageService } from '../../services/'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  constructor(
    public localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void { }

  openHistory(): void {
    this.localStorageService.historyOpen = true;
    this.localStorageService.history = JSON.parse(this.localStorageService.loadLocalStorage('history'));
  }

  closeHistory() {
    this.localStorageService.historyOpen = false;
  }

}
