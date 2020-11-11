import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  NgForm,
} from '@angular/forms';

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

  queryPlate() {
    if (this.plateNationalForm.form.valid) this.platesComponent.queryPlate();
  }

}
