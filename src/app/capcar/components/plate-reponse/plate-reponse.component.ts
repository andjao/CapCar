import { Component, OnInit } from '@angular/core';

import { Brand } from '../..';
import { PlateRequestService } from '../../services';

@Component({
  selector: 'app-plate-reponse',
  templateUrl: './plate-reponse.component.html',
  styleUrls: ['./plate-reponse.component.scss']
})
export class PlateReponseComponent implements OnInit {

  public brand: Brand;

  constructor(public plateRequestService: PlateRequestService) { }

  ngOnInit(): void {
    console.log(1);
  }

  fipeValue() {
    let brand;
    this.plateRequestService.fipeBrandsRequest('carros')
      .subscribe(
        response => {
          this.brand = response;
          response.forEach(item => {
            if (item.fipe_name == this.plateRequestService.plateResponse.marca.split('/')[0]) return brand = item.fipe_name;
          });
        }, error => {
          return "Erro ao consultar a tabela FIPE"
        }
      );
  }
}
