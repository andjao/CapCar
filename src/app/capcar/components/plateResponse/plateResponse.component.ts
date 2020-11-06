import {
  Component,
  OnInit,
} from '@angular/core';

import {
  PlateRequestService,
} from '../../services';

@Component({
  selector: 'app-plateResponse',
  templateUrl: './plateResponse.component.html',
  styleUrls: ['./plateResponse.component.scss']
})
export class PlateReponseComponent implements OnInit {

  constructor(
    public plateRequestService: PlateRequestService
  ) { }

  ngOnInit(): void {
  }

  titleize(text: string, firstWord: boolean, lowerCase: boolean) {
    let words = new Array();
    if (firstWord) {
      words = text.split(" ");
      words[0] = words[0].toLowerCase();
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    } else {
      if (lowerCase) {
        words = text.toLowerCase().split(" ");
      } else {
        words = text.split(" ");
      }
      for (let a = 0; a < words.length; a++) {
        let w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
      }
    }
    return words.join(" ");
  }
}
