import { Component } from '@angular/core';

import { PlateRequestService } from './capcar/'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public plateRequestService: PlateRequestService) { }
  
  title = 'CapCar';
}
