import {
  Component,
  OnInit,
} from '@angular/core';

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
  templateUrl: './plates.component.html',
  styleUrls: ['./plates.component.scss']
})
export class PlatesComponent implements OnInit {

  selectedType: string;
  mercoSul: boolean;

  plateNational: Plate;
  stateCountyRes: string;

  plateMercoSul: Plate;

  queryBtn: boolean = false;

  constructor(
    private plateRequestService: PlateRequestService,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService,
    public fipeValueComponent: FipeValueComponent,
  ) {
    this.stateCountyRes = 'BRASIL';
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if (!JSON.parse(this.localStorageService.loadLocalStorage('history'))) {
      this.selectedType = "carros";
    } else {
      this.selectedType = JSON.parse(this.localStorageService.loadLocalStorage('history'))[0].tipo;
      this.mercoSul = JSON.parse(this.localStorageService.loadLocalStorage('history'))[0].mercosul;
    }
  }

  queryPlate(plateS?): void {
    let plate;
    if (this.mercoSul) {
      plate = this.plateMercoSul;
    } else {
      plate = this.plateNational;
    }
    this.loadingService.loadingM(true, '.8', 'Consultando...')
    this.plateRequestService
      .plateRequest(plateS || plate.toUpperCase())
      .subscribe(
        response => {
          this.loadingService.loadingM(false);
          if (response.codigoRetorno == "404") {
            this.plateRequestService.queryOK = false;
            return;
          } else {
            this.plateRequestService.plateResponse = response;
            this.clearWords(response);
            this.plateRequestService.queryOK = true;
            this.checkType(this.selectedType);
            this.localStorageService.saveLocalStorage('history', response, {
              type: this.selectedType,
              mercosul: this.mercoSul
            });
            this.fipeValueComponent.fipeBrands(this.selectedType)
          }
        },
        error => {
          this.plateRequestService.queryOK = false;
          this.loadingService.loadingM(false);
        }
      );
  }

  clearWords(response): void {
    this.plateRequestService.plateResponse.placa = response.placa.match(/[a-zA-Z]+|[0-9]+/g).join("-");
    if (response.marca.indexOf('/') > -1 || response.modelo.indexOf('/') > -1) {
      this.plateRequestService.plateResponse.marca = response.marca.split('/')[0];
      this.plateRequestService.plateResponse.modelo = response.modelo.split('/')[1];
    }

    const brand = this.plateRequestService.plateResponse.marca.toUpperCase();

    switch (true) {
      case brand.indexOf('AMGC') != -1:
        this.plateRequestService.plateResponse.marca = 'Am Gem';
        break;
      case brand.indexOf('CHEV') != -1:
        this.plateRequestService.plateResponse.marca = 'Chevrolet';
        break;
      case brand.indexOf('IMP') != -1:
        this.plateRequestService.plateResponse.marca = 'GM';
        break;
      case brand.indexOf('JAG') != -1:
        this.plateRequestService.plateResponse.marca = 'Jaguar';
        break;
      case brand.indexOf('LROVER') != -1:
      case brand.indexOf('LR') != -1:
        this.plateRequestService.plateResponse.marca = 'Land Rover';
        break;
      case brand.indexOf('MPOLO') != -1:
        this.plateRequestService.plateResponse.marca = 'Marcopolo';
        break;
      case brand.indexOf('BRAMONT') != -1:
        this.plateRequestService.plateResponse.marca = 'Mahindra';
        break;
      case brand.indexOf('MB') != -1:
      case brand.indexOf('MBENZ') != -1:
      case brand.indexOf('M.BENZ') != -1:
      case brand.indexOf('M.BEMZ') != -1:
      case brand.indexOf('MERCEDES BENZ') != -1:
      case brand.indexOf('MERCEDES') != -1:
        this.plateRequestService.plateResponse.marca = 'Mercedes-Benz';
        break;
      case brand.indexOf('MMC') != -1:
        this.plateRequestService.plateResponse.marca = 'Mitsubishi';
        break;
      case brand.indexOf('INTERNATIONAL') != -1:
        this.plateRequestService.plateResponse.marca = 'Navistar';
        break;
      case brand.indexOf('AMV') != -1:
      case brand.indexOf('PUMA') != -1:
        this.plateRequestService.plateResponse.marca = 'Puma-Alfa';
        break;
      case brand.indexOf('VW') != -1:
        this.plateRequestService.plateResponse.marca = 'Volkswagen';
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

  history() {
    this.localStorageService.historyOpen = true;
    this.localStorageService.history = JSON.parse(this.localStorageService.loadLocalStorage('history'));
  }

}
