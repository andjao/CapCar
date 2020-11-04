import { Component, OnInit } from '@angular/core';

import { PlateResponse, Brand, Model } from '../..';
import { PlateRequestService } from '../../services';

@Component({
  selector: 'app-fipeValue',
  templateUrl: './fipeValue.component.html',
  styleUrls: ['./fipeValue.component.scss']
})

export class FipeValueComponent implements OnInit {

  public plateResponse: PlateResponse;
  private brand: Brand;
  public model: Model;
  public modelWords = new Array();

  constructor(public plateRequestService: PlateRequestService) { }

  ngOnInit(): void {
  }

  fipeBrands(type) {
    this.plateResponse = this.plateRequestService.plateResponse;
    this.modelWords = this.plateResponse.modelo.split('/')[1].split(" ");
    this.plateRequestService.fipeBrandsRequest(type)
      .subscribe(
        response => {
          response.forEach(item => {
            if (item.fipe_name.match(this.plateResponse.marca.split('/')[0])) {
              this.brand = item;
              this.fipeModels(type, this.brand.id);
              return;
            };
          });
        }, error => {
          return console.log("Erro ao consultar a tabela FIPE");
        }
      );
  }

  fipeModels(type, brandID) {
    this.plateRequestService.fipeModelsRequest(type, brandID)
      .subscribe(
        response => {
          let compatibleCount = 0;
          response.forEach(model => {
            if (this.modelWords.find(word => model.fipe_name.includes(word))) {
              compatibleCount++;
              let count = 0;
              if (compatibleCount > 1) {
                for (let word of this.modelWords) {
                  if (model.fipe_name.toUpperCase().match(word.toUpperCase())) {
                    count++;
                    if (count > 1 && count <= this.modelWords.length) {
                      return console.log(model.fipe_name)
                    };
                  }
                }
              } else {
                console.log(model.fipe_name);
              }
            };
          });
        }, error => {
          return console.log("Erro ao consultar a tabela FIPE");
        }
      );
  }
}
