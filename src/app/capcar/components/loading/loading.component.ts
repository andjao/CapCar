import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../services'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  constructor(
    public loadingService: LoadingService
  ){}


  ngOnInit(): void {

  }

  changeBackground(opacity){
    return `rgba(0, 0, 0, ${opacity})`;
  }

}
