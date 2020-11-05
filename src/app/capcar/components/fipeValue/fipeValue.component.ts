import { Component, OnInit, ɵConsole } from '@angular/core';

import { PlateResponse, FipeBrand } from '../..';
import { PlateRequestService } from '../../services';

@Component({
  selector: 'app-fipeValue',
  templateUrl: './fipeValue.component.html',
  styleUrls: ['./fipeValue.component.scss']
})

export class FipeValueComponent implements OnInit {

  private plateResponse: PlateResponse;
  private brand: FipeBrand;
  private modelsID = new Array;
  private yearID = new Array;

  constructor(public plateRequestService: PlateRequestService) { }

  ngOnInit(): void {
  }

  fipeBrands(type) {
    this.brand = null;
    this.modelsID = [];
    this.plateRequestService.fipeError = false;
    this.yearID = [];
    this.plateRequestService.fipeValue = null;
    this.plateRequestService.fipeOK = false;
    this.plateResponse = this.plateRequestService.plateResponse;
    this.plateRequestService.fipeBrandsRequest(type)
      .subscribe(
        response => {
          response.forEach(item => {
            if (item.fipe_name.match(this.plateResponse.marca)) {
              this.brand = item;
            };
          });
          if (this.brand !== null) {
            this.plateRequestService.fipeError = false;
            this.fipeModels(type, this.brand.id);
          } else {
            this.plateRequestService.fipeError = true;
          }
        }, error => {
          this.plateRequestService.fipeError = true;
        }
      );
  }

  fipeModels(type, brandID) {
    this.plateRequestService.fipeModelsRequest(type, brandID)
      .subscribe(
        response => {
          response.forEach(model => {
            if (model.fipe_name.toUpperCase().match(this.plateResponse.modelo.toUpperCase())) {
              this.modelsID.push(model.id);
            }
          });
          if (this.modelsID.length > 0) {
            this.plateRequestService.fipeError = false;
            this.fipeYears(type, this.brand.id, this.modelsID);
          } else {
            this.plateRequestService.fipeError = true;
          };
        }, error => {
          this.plateRequestService.fipeError = true;
        }
      );
  }

  fipeYears(type, brandID, modelsID) {
    let modelIDSelectd;
    for (let modelID of modelsID) {
      this.plateRequestService.fipeYearsRequest(type, brandID, modelID)
        .subscribe(
          response => {
            response.forEach(year => {
              if (year.id.match(this.plateResponse.ano)) {
                modelIDSelectd = modelID;
                this.yearID.push(year.id);
              };
            });
            if (modelIDSelectd !== undefined) {
              this.fipeAll(type, this.brand.id, modelIDSelectd, this.yearID);
              this.plateRequestService.fipeError = false;
              return;
            } else {
              this.plateRequestService.fipeError = true;
            };
          }, error => {
            this.plateRequestService.fipeError = true;
          }
        );
    }
  }

  fipeAll(type, brandID, modelID, yearsID) {
    this.plateRequestService.fipeAllRequest(type, brandID, modelID, yearsID)
      .subscribe(
        response => {
          this.plateRequestService.fipeValue = response;
          this.plateRequestService.fipeOK = true;
        }, error => {
          this.plateRequestService.fipeError = true;
        }
      );
  }
}
