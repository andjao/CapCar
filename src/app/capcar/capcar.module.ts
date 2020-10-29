import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  BackgroundComponent,
  LoadingComponent,
  PlateComponent,
  PlateReponseComponent
} from './components';
import { LoadingService, PlateRequestService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    BackgroundComponent,
    LoadingComponent,
    PlateComponent,
    PlateReponseComponent
  ],
  exports: [
    BackgroundComponent,
    LoadingComponent,
    PlateComponent,
    PlateReponseComponent
  ],
  providers: [
    LoadingService,
    PlateRequestService
  ]
})
export class CapcarModule { }
