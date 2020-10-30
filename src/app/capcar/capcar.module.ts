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

import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  declarations: [
    BackgroundComponent,
    LoadingComponent,
    PlateComponent,
    PlateReponseComponent,
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
