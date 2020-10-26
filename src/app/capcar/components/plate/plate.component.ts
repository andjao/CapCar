import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Plate, PlateResponse } from '../../models'
import { PlateRequestService } from '../../services';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.css']
})
export class PlateComponent implements OnInit {

  private plate: Plate;
  private plateResponse: PlateResponse;

  @ViewChild("plateForm", { static: true }) plateForm: NgForm;

  constructor(
    private plateRequestService:PlateRequestService
  ) { }

  ngOnInit(): void {
  }

  consulta(event){
    alert(event.target.value);
  }

}
