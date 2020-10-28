import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BackgroundComponent,
  LoadingComponent,
  ToolbarComponent,
  PlateComponent,
  PlateReponseComponent
} from './components';
import { LoadingService, PlateRequestService } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BackgroundComponent,
    LoadingComponent,
    ToolbarComponent,
    PlateComponent,
    PlateReponseComponent
  ],
  exports: [
    BackgroundComponent,
    LoadingComponent,
    ToolbarComponent,
    PlateComponent,
    PlateReponseComponent
  ],
  providers: [
    LoadingService,
    PlateRequestService
  ]
})
export class CapcarModule { }
