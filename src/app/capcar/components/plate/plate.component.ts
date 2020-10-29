import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Plate, PlateResponse } from '../../models'
import { PlateRequestService } from '../../services';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss']
})
export class PlateComponent implements OnInit {

  plate = new Plate;
  plateResponse: PlateResponse;

  @ViewChild("plateForm", { static: true }) plateForm: NgForm;

  constructor(
    private plateRequestService: PlateRequestService
  ) { 
  }

  ngOnInit(): void {
  }

  queryPlate(): void {
    if (this.plateForm.form.valid) {
      // this.plateRequestService.plateRequest(this.plate);
      console.log((this.plate));
    }
  }

}
