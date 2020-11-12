import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  NgForm,
} from '@angular/forms';

import * as $ from 'jquery';

import {
  PlatesComponent
} from '../plates';

@Component({
  selector: 'app-plateNational',
  templateUrl: './plateNational.component.html',
  styleUrls: ['./plateNational.component.scss']
})
export class PlateNationalComponent implements OnInit {

  @ViewChild("plateNationalForm") plateNationalForm: NgForm;

  constructor(public platesComponent: PlatesComponent) { }

  ngOnInit(): void {
  }

  checkValid() {
    if (this.plateNationalForm.form.valid) {
      this.platesComponent.queryBtn = true;
    } else {
      this.platesComponent.queryBtn = false;
    }
  }

  queryPlate(event) {
    if (this.plateNationalForm.form.valid) {
      $(event.target).blur();
      this.platesComponent.queryPlate();
    }
  }
}
