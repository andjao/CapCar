import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../services'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  separateLetters = [];

  constructor(
    public loadingService: LoadingService
  ){}

  ngOnInit(): void {}

  changeBackground(opacity){
    return `rgba(0, 0, 0, ${opacity})`;
  }

  letterSeparator(word){
    this.separateLetters = [];
    for (var i = 0; i < word.length; i++) {
      this.separateLetters.push(word[i]);
    }
    return this.separateLetters;
  }

}
