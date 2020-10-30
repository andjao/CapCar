import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Plate, PlateResponse } from '../../models'
import { PlateRequestService, LoadingService } from '../../services';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss']
})
export class PlateComponent implements OnInit {

  plate: Plate;
  plateResponse: PlateResponse;
  haveError: boolean;
  stateCountyRes;

  @ViewChild("plateForm", { static: true }) plateForm: NgForm;

  constructor(
    private plateRequestService: PlateRequestService,
    private loadingService: LoadingService
  ) {
    this.stateCountyRes = 'BRASIL';
  }

  ngOnInit(): void {
  }

  queryPlate(): void {
    if (this.plateForm.form.valid) {
      this.loadingService.loadingM(true, '.8', 'Consultando...')
      this.plateRequestService
        .plateRequest(this.plate)
        .subscribe(
          response => {
            this.plateRequestService.plateResponse = response;
            this.plateResponse = this.plateRequestService.plateResponse;
            this.stateCountyRes = `${this.plateResponse.uf} - ${this.plateResponse.municipio}`;
            this.plateRequestService.queryON = true;
            this.loadingService.loadingM(false);
          },
          error => {
            this.haveError = true;
            this.plateRequestService.queryON = false;
          }
        );
    }
  }
}
