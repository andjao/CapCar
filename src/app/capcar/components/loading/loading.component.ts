import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../services'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  ;

  constructor(
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void { }

  changeBackground(opacity: string) {
    return `rgba(0, 0, 0, ${opacity})`;
  }

  letterSeparator(word: Array<any>) {
    let separateLetters = [];
    for (var i = 0; i < word.length; i++) {
      separateLetters.push(word[i]);
    }
    return separateLetters;
  }

}
