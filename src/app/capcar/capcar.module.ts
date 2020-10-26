import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlateComponent } from './components';
import { PlateRequestService } from './services';

@NgModule({
  declarations: [
    PlateComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PlateComponent
  ],
  providers:[
    PlateRequestService
  ]
})
export class CapcarModule { }
