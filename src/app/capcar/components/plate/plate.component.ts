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

  init(): void {
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
              this.checkType(this.selectedOption);
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

  clearWords(response): void {
    this.plateRequestService.plateResponse.placa = response.placa.match(/[a-zA-Z]+|[0-9]+/g).join("-");
    if (response.marca.indexOf('/') > -1 || response.modelo.indexOf('/') > -1) {
      this.plateRequestService.plateResponse.marca = response.marca.split('/')[0];
      this.plateRequestService.plateResponse.modelo = response.modelo.split('/')[1];
    }

    const brand = this.plateRequestService.plateResponse.marca.toUpperCase();
    switch (true) {
      case (brand.indexOf('imp'.toUpperCase()) != -1):
        this.plateRequestService.plateResponse.marca = 'GM';
        break;
    }

    const model = this.plateRequestService.plateResponse.modelo.toUpperCase();
    switch (true) {
      case (model.indexOf('chevrolet'.toUpperCase()) != -1):
        this.plateRequestService.plateResponse.modelo = model.split('chevrolet '.toUpperCase())[1];
        break;
      case (model.indexOf('gm'.toUpperCase()) != -1):
        this.plateRequestService.plateResponse.modelo = model.split('gm '.toUpperCase())[1];
        break;
    }
  }

  checkType(type): void {
    let vehicleType: string;
    switch (type) {
      case 'carros':
        vehicleType = 'Carro';
        break;
      case 'motos':
        vehicleType = "Moto";
        break;
      case 'caminhoes':
        vehicleType = "Caminhão";
        break;
    }
    this.plateRequestService.vehicleType = vehicleType;
  }
}
