import { Component } from '@angular/core';

import { LoadingText } from 'src/app/capcar/models'
import { LoadingService } from 'src/app/capcar/services'
import { LoadingComponent } from './capcar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CapCar';
  
  constructor(
    private loadingService:LoadingService
  ){}

  ngOnInit(): void {
    this.loadingService.loadingM(true, "Carregando");
  }
}
