import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../services'

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  constructor(
    public loadingService: LoadingService
  ){}

  ngOnInit(): void {
    this.loadingService.loadingM(true);
  }

}
