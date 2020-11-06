import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  NgForm,
} from '@angular/forms';

import {
  Plate,
} from '../..';

import {
  PlateRequestService,
  LoadingService,
  LocalStorageService,
} from '../../services';

import {
  FipeValueComponent,
} from '../fipeValue';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss']
})
export class PlateComponent implements OnInit {

  plate: Plate;
  stateCountyRes: string;
  selectedOption;

  @ViewChild("plateForm", { static: true }) plateForm: NgForm;

  constructor(
    private plateRequestService: PlateRequestService,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService,
    public fipeValueComponent: FipeValueComponent
  ) {
    this.stateCountyRes = 'BRASIL';
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (!JSON.parse(this.localStorageService.loadLocalStorage('history'))) {
      this.selectedOption = "carros";
    } else {
      this.selectedOption = JSON.parse(this.localStorageService.loadLocalStorage('history'))[0].tipo
    }
  }

  queryPlate(): void {
    if (this.plateForm.form.valid) {
      this.loadingService.loadingM(true, '.8', 'Consultando...')
      this.plateRequestService
        .plateRequest(this.plate)
        .subscribe(
          response => {
            this.loadingService.loadingM(false);
            if (response.codigoRetorno == "404") {
              this.stateCountyRes = 'BRASIL';
              this.plateRequestService.queryOK = false;
              return;
            } else {
              this.plateRequestService.plateResponse = response;
              this.clearWords(response);
              this.stateCountyRes = `${this.plateRequestService.plateResponse.uf} - ${this.plateRequestService.plateResponse.municipio}`;
              this.plateRequestService.queryOK = true;
              this.localStorageService.saveLocalStorage('history', response, this.selectedOption);
              this.fipeValueComponent.fipeBrands(this.selectedOption)
            }
          },
          error => {
            this.plateRequestService.queryOK = false;
            this.stateCountyRes = 'BRASIL';
            this.loadingService.loadingM(false);
          }
        );
    }
  }

  clearWords(response) {
    if (response.marca.indexOf('/') > -1 || response.modelo.indexOf('/') > -1) {
      this.plateRequestService.plateResponse.marca = response.marca.split('/')[0];
      this.plateRequestService.plateResponse.modelo = response.modelo.split('/')[1];
    }

    let model = this.plateRequestService.plateResponse.modelo.toUpperCase();
    switch (true) {
      case (model.toUpperCase().indexOf('chevrolet'.toUpperCase()) != -1):
        this.plateRequestService.plateResponse.modelo = model.split('chevrolet '.toUpperCase())[1];
        break;
    }

    if (this.plateRequestService.plateResponse.modelo.split(" ")[0].match(/[0-9]/)) {
      let words = this.plateRequestService.plateResponse.modelo.split(" ");
      words[0] = this.plateRequestService.plateResponse.modelo.split(" ")[0].match(/[a-zA-Z]+|[0-9]+/g).join("-");
      this.plateRequestService.plateResponse.modelo = words[0];
    }
  }
}
