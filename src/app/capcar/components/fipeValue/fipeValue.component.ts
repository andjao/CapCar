import {
  Component,
  OnInit,
} from '@angular/core';

import {
  PlateResponse,
  FipeBrand,
} from '../..';

import {
  PlateRequestService,
} from '../../services';

@Component({
  selector: 'app-fipeValue',
  templateUrl: './fipeValue.component.html',
  styleUrls: ['./fipeValue.component.scss']
})

export class FipeValueComponent implements OnInit {

  private plateResponse: PlateResponse;
  private brand: FipeBrand;
  private modelsID = new Array;

  constructor(
    public plateRequestService: PlateRequestService
  ) { }

  ngOnInit(): void {
  }

  fipeBrands(type) {
    this.brand = null;
    this.modelsID = [];
    this.plateRequestService.fipeError = false;
    this.plateRequestService.fipeNotFound = null;
    this.plateRequestService.fipeValues = [];
    this.plateRequestService.fipeOK = false;
    this.plateResponse = this.plateRequestService.plateResponse;
    this.plateRequestService.fipeBrandsRequest(type)
      .subscribe(
        response => {
          response.forEach(element => {
            if (element.fipe_name.toUpperCase().match(this.plateResponse.marca.toUpperCase())) {
              this.brand = element;
            };
          });
          if (this.brand !== null) {
            this.plateRequestService.fipeError = false;
            this.fipeModels(type, this.brand.id);
          } else {
            this.plateRequestService.fipeNotFound = true;
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
          const model = this.plateResponse.modelo.split(/[\*/ ]/);
          let larger = 0;
          response.map(element => {
            let count = 0;
            if (element.fipe_name.toUpperCase().match(model[0].toUpperCase())) {
              for (let word of model) {
                if (element.fipe_name.toUpperCase().match(word.toUpperCase())) {
                  count++;
                  if (count > larger) {
                    this.modelsID = [];
                    this.modelsID.push(element.id);
                    larger = count;
                  } else if (count == larger) {
                    this.modelsID.push(element.id);
                  }
                }
              }
            }
          });
          if (this.modelsID.length > 0) {
            this.plateRequestService.fipeError = false;
            this.fipeYears(type, this.brand.id, this.modelsID);
          } else {
            this.plateRequestService.fipeNotFound = true;
          };
        }, error => {
          this.plateRequestService.fipeError = true;
        }
      );
  }

  fipeYears(type, brandID, modelsID) {
    for (let modelID of modelsID) {
      this.plateRequestService.fipeYearsRequest(type, brandID, modelID)
        .subscribe(
          response => {
            response.forEach(element => {
              if (element.fipe_codigo.match(this.plateRequestService.plateResponse.anoModelo)) {
                this.fipeAll(type, brandID, modelID, element.id);
              }
            });
          }, error => {
            this.plateRequestService.fipeError = true;
          })
    }
  }

  fipeAll(type, brandID, modelID, yearsID) {
    this.plateRequestService.fipeAllRequest(type, brandID, modelID, yearsID)
      .subscribe(
        response => {
          this.plateRequestService.fipeValues.push(response)
          this.plateRequestService.fipeOK = true;
        }, error => {
          this.plateRequestService.fipeError = true;
        }
      );
  }

  letterSeparator(word) {
    let separateLetters = [];
    for (var i = 0; i < word.length; i++) {
      separateLetters.push(word[i]);
    }
    return separateLetters;
  }
}
