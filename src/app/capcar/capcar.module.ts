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
import { PlateDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    BackgroundComponent,
    LoadingComponent,
    PlateComponent,
    PlateReponseComponent,
    PlateDirective
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
