import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgroundComponent, LoadingComponent, PlateComponent } from './components';
import { PlateRequestService } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BackgroundComponent,
    LoadingComponent,
    PlateComponent
  ],
  exports: [
    BackgroundComponent,
    LoadingComponent,
    PlateComponent
  ],
  providers:[
    PlateRequestService
  ]
})
export class CapcarModule { }
