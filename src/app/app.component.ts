import {
  Component,
} from '@angular/core';

import {
  SharedService,
} from './capcar/'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public sharedService: SharedService,
  ) { }

  title = 'CapCar';
}
