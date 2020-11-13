import {
  Component,
  OnInit,
} from '@angular/core';

import {
  PlateResponse,
  FipeBrand,
} from '../..';

import {
  RequestsService,
  SharedService
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
  private larger: number;
  private count: number;

  constructor(
    public requestsService: RequestsService,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  fipeBrands(type) {
    this.brand = null;
    this.modelsID = [];
    this.sharedService.fipeError = false;
    this.sharedService.fipeNotFound = null;
    this.sharedService.fipeValues = [];
    this.sharedService.fipeOK = false;
    this.plateResponse = this.sharedService.plateResponse;
    this.requestsService.fipeBrandsRequest(type)
      .subscribe(
        response => {
          response.forEach(element => {
            if (element.fipe_name.toUpperCase().match(this.plateResponse.marca.toUpperCase())) {
              this.brand = element;
            };
          });
          if (this.brand !== null) {
            this.sharedService.fipeError = false;
            this.fipeModels(type, this.brand.id);
          } else {
            this.sharedService.fipeNotFound = true;
          }
        }, error => {
          this.sharedService.fipeError = true;
        }
      );
  }

  loopWords(model, element) {
    for (let word of model) {
      if (element.fipe_name.toUpperCase().match(word.toUpperCase())) {
        this.count++;
        if (this.count > this.larger) {
          this.modelsID = [];
          this.modelsID.push(element.id);
          this.larger = this.count;
        } else if (this.count == this.larger) {
          this.modelsID.push(element.id);
        }
      }
    }
  }

  fipeModels(type, brandID) {
    this.requestsService.fipeModelsRequest(type, brandID)
      .subscribe(
        response => {
          this.larger = 0;
          response.map(element => {
            const model = this.plateResponse.modelo.split(/[\*/ ]/);
            this.count = 0;
            if (element.fipe_name.toUpperCase().match(model[0].toUpperCase())) {
              this.loopWords(model, element);
            } else if (element.fipe_name.toUpperCase().match(model[0].match(/[a-zA-Z]+|[0-9]+/g).join("-"))) {
              model[0] = model[0].match(/[a-zA-Z]+|[0-9]+/g).join("-");
              this.sharedService.plateResponse.modelo = model.join(" ");
              this.loopWords(model, element);
            }
          });
          if (this.modelsID.length > 0) {
            this.sharedService.fipeError = false;
            this.fipeYears(type, this.brand.id, this.modelsID);
          } else {
            this.sharedService.fipeNotFound = true;
          };
        }, error => {
          this.sharedService.fipeError = true;
          if (error.response == undefined) alert("Você ultrapassou o numero de consultas que pode ser feita por minuto. Por favor aguarde um pouco em tente novamente em instantes.");
        }
      );
  }

  fipeYears(type, brandID, modelsID) {
    for (let modelID of modelsID) {
      this.requestsService.fipeYearsRequest(type, brandID, modelID)
        .subscribe(
          response => {
            response.forEach(element => {
              if (element.fipe_codigo.match(this.sharedService.plateResponse.anoModelo)) {
                this.fipeAll(type, brandID, modelID, element.id);
              }
            });
          }, error => {
            this.sharedService.fipeError = true;
            if (error.response == undefined) alert("Você ultrapassou o numero de consultas que pode ser feita por minuto. Por favor aguarde um pouco em tente novamente em instantes.");
          })
    }
  }

  fipeAll(type, brandID, modelID, yearsID) {
    this.requestsService.fipeAllRequest(type, brandID, modelID, yearsID)
      .subscribe(
        response => {
          this.sharedService.fipeValues.push(response)
          this.sharedService.fipeOK = true;
        }, error => {
          this.sharedService.fipeError = true;
          if (error.response == undefined) alert("Você ultrapassou o numero de consultas que pode ser feita por minuto. Por favor aguarde um pouco em tente novamente em instantes.");
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
