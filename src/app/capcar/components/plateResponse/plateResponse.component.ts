import {
  Component,
  OnInit,
} from '@angular/core';

import {
  RequestsService,
  SharedService,
} from '../../services';

@Component({
  selector: 'app-plateResponse',
  templateUrl: './plateResponse.component.html',
  styleUrls: ['./plateResponse.component.scss']
})
export class PlateReponseComponent implements OnInit {

  constructor(
    public requestsService: RequestsService,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  hyphenation(text) {
    if (!text.mercosul) {
      return text.placa.match(/[a-zA-Z]+|[0-9]+/g).join("-");
    } else {
      return text.placa;
    }
  }

  checkTheft() {
    return this.sharedService.plateResponse.situacao.toLowerCase().match(/roubo|furto/);
  }
}
