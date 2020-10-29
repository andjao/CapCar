import {
  Directive,
  HostListener
} from '@angular/core';
import { Validators } from '@angular/forms';


@Directive({
  selector: '[plate]'
})


export class PlateDirective {

  constructor() { }
  
  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let plate = $event.target.value;
  }

}
